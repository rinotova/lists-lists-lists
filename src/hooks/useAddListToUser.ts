import { useState } from "react";
import { useToast } from "~/app/_components/ui/use-toast";
import { ListSchema, type UserList } from "~/models/List";
import { api } from "~/trpc/react";

export const useAddListToUser = () => {
  const [itemName, setItemName] = useState("");

  const trpcUtils = api.useUtils();

  const { toast } = useToast();
  const { mutate, isLoading } = api.list.addListToUser.useMutation({
    onMutate: async (newList) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update.
      await trpcUtils.list.getUserLists.cancel();

      // Snapshot of the previous value
      const previousLists = trpcUtils.list.getUserLists.getData();

      // Optimistically update to the new value
      trpcUtils.list.getUserLists.setData(undefined, (prev) => {
        const optimisticList: UserList = {
          id: "optimisticListId",
          name: newList.name,
        };
        if (!prev) {
          return [optimisticList];
        }
        return [optimisticList, ...prev];
      });
      setItemName("");

      return { previousLists };
    },
    onError: (err, newList, context) => {
      toast({
        title: "Error",
        description:
          err.data?.code === "BAD_REQUEST"
            ? err.message
            : "There was an error when creating the list",
        variant: "destructive",
        duration: 2500,
      });
      setItemName("");
      trpcUtils.list.getUserLists.setData(
        undefined,
        () => context?.previousLists,
      );
    },
    onSettled: async () => {
      await trpcUtils.list.getUserLists.invalidate();
    },
  });

  const addItem = (suggestedEmoji?: number) => {
    if (isLoading) {
      return;
    }
    const inputParseResult = ListSchema.safeParse({
      name: itemName,
    });

    if (inputParseResult.success) {
      mutate({
        name: itemName,
      });
    } else {
      toast({
        title: "Error",
        description: inputParseResult.error.issues[0]?.message,
        variant: "destructive",
        duration: 2500,
      });
    }
  };

  return {
    addItem,
    itemName,
    setItemName,
    isLoading,
  };
};
