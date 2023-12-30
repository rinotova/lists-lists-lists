import { toast } from "~/app/_components/ui/use-toast";
import { type UserList } from "~/models/List";
import { api } from "~/trpc/react";

export const useEditList = () => {
  const trpcUtils = api.useUtils();

  const { mutate } = api.list.updateList.useMutation({
    onMutate: async ({ id, name, emoji }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update.
      await trpcUtils.list.getUserLists.cancel();

      // Snapshot of the previous value
      const previousItems = trpcUtils.list.getUserLists.getData();

      // Optimistically update to the new value
      trpcUtils.list.getUserLists.setData(undefined, (prev) => {
        if (!prev) {
          return previousItems;
        }

        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, name, emoji: emoji as number | null };
          }
          return item;
        });
      });
      return { previousItems };
    },
    onError: (err, newItem, context) => {
      toast({
        title: "Error",
        description: "There was an error when updating the list",
        variant: "destructive",
        duration: 2500,
      });
      trpcUtils.list.getUserLists.setData(
        undefined,
        () => context?.previousItems,
      );
    },
    onSettled: async () => {
      await trpcUtils.list.getUserLists.invalidate();
    },
  });

  const editListHandler = (list: UserList) => {
    mutate({ ...list, emoji: list.emoji as number | undefined });
  };

  return {
    editList: editListHandler,
  };
};
