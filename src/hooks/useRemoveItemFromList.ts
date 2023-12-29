import { toast } from "~/app/_components/ui/use-toast";
import { api } from "~/trpc/react";

export const useRemoveItemFromList = (listId: string) => {
  const trpcUtils = api.useUtils();

  const { mutate } = api.list.removeListItem.useMutation({
    onMutate: async ({ itemId }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update.
      await trpcUtils.list.getListItems.cancel({ listId });

      // Snapshot of the previous value
      const previousListsItems = trpcUtils.list.getListItems.getData({
        listId,
      });

      // Optimistically update to the new value
      trpcUtils.list.getListItems.setData({ listId }, (prev) => {
        if (!prev) {
          return previousListsItems;
        }

        return prev.filter((item) => item.id !== itemId);
      });
      return { previousListsItems };
    },
    onError: (err, newItem, context) => {
      toast({
        title: "Error",
        description: "There was an error when deleting the item",
        variant: "destructive",
        duration: 2500,
      });
      trpcUtils.list.getListItems.setData(
        { listId },
        () => context?.previousListsItems,
      );
    },
    onSettled: async () => {
      await trpcUtils.list.getListItems.invalidate({ listId });
    },
  });

  return {
    deleteItem: mutate,
  };
};
