import { useState } from "react";
import { useToast } from "~/app/_components/ui/use-toast";
import { type ListItem, ListItemSchema } from "~/models/List";
import { api } from "~/trpc/react";

export const useAddItemToList = ({
  listId = "clqpozjp10001wf1ixyklrino",
}: {
  listId?: string;
}) => {
  const [itemName, setItemName] = useState("");
  const trpcUtils = api.useUtils();

  const { toast } = useToast();
  const { mutate, isLoading } = api.list.addItemToList.useMutation({
    onMutate: async (newItem) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update.
      await trpcUtils.list.getListItems.cancel();

      // Snapshot of the previous value
      const previousItems = trpcUtils.list.getListItems.getData({ listId });

      // Optimistically update to the new value
      trpcUtils.list.getListItems.setData({ listId }, (prev) => {
        const optimisticItem: ListItem = {
          id: "optimisticItemId",
          text: newItem.text,
          listId: newItem.listId,
          complete: false,
          emoji: newItem.emoji as number | null,
        };
        if (!prev) {
          return [optimisticItem];
        }
        return [optimisticItem, ...prev];
      });
      setItemName("");
      return { previousItems };
    },
    onError: (err, newList, context) => {
      toast({
        title: "Error",
        description: "There was an error when creating the item",
        variant: "destructive",
        duration: 2500,
      });
      setItemName("");

      trpcUtils.list.getListItems.setData(
        { listId },
        () => context?.previousItems,
      );
    },
    onSettled: async () => {
      await trpcUtils.list.getListItems.invalidate({ listId });
    },
  });

  const addItem = (suggestedEmoji?: number) => {
    if (isLoading) {
      return;
    }
    const inputParseResult = ListItemSchema.safeParse({
      text: itemName,
      listId,
      complete: false,
    });

    if (inputParseResult.success) {
      mutate({
        text: itemName,
        listId,
        emoji: suggestedEmoji,
        complete: false,
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
