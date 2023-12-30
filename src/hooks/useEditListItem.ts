import { toast } from "~/app/_components/ui/use-toast";
import { type ListItem } from "~/models/List";
import { api } from "~/trpc/react";

export const useEditListItem = (listId: string) => {
  const trpcUtils = api.useUtils();

  const { mutate } = api.list.updateListItem.useMutation({
    onMutate: async ({ id, text, complete }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update.
      await trpcUtils.list.getListItems.cancel();

      // Snapshot of the previous value
      const previousItems = trpcUtils.list.getListItems.getData({ listId });

      // Optimistically update to the new value
      trpcUtils.list.getListItems.setData({ listId }, (prev) => {
        if (!prev) {
          return previousItems;
        }

        return prev.map((item) => {
          if (item.id === id) {
            return { ...item, text, complete };
          }
          return item;
        });
      });
      return { previousItems };
    },
    onError: (err, newItem, context) => {
      toast({
        title: "Error",
        description: "There was an error when updating the item",
        variant: "destructive",
        duration: 2500,
      });
      trpcUtils.list.getListItems.setData(
        { listId },
        () => context?.previousItems,
      );
    },
    onSettled: async () => {
      await trpcUtils.list.getListItems.invalidate({ listId });
    },
  });

  const editItemHandler = (item: ListItem) => {
    mutate(item);
  };

  return {
    editItem: editItemHandler,
  };
};
