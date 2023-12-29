import { toast } from "~/app/_components/ui/use-toast";
import { api } from "~/trpc/react";

export const useRemoveListFromUser = () => {
  const trpcUtils = api.useUtils();

  const { mutate } = api.list.removeList.useMutation({
    onMutate: async ({ listId }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update.
      await trpcUtils.list.getUserLists.cancel();

      // Snapshot of the previous value
      const previousLists = trpcUtils.list.getUserLists.getData();

      // Optimistically update to the new value
      trpcUtils.list.getUserLists.setData(undefined, (prev) => {
        if (!prev) {
          return previousLists;
        }

        return prev.filter((list) => list.id !== listId);
      });
      return { previousLists };
    },
    onError: (err, newList, context) => {
      toast({
        title: "Error",
        description: "There was an error when deleting the item",
        variant: "destructive",
        duration: 2500,
      });
      trpcUtils.list.getUserLists.setData(
        undefined,
        () => context?.previousLists,
      );
    },
    onSettled: async () => {
      await trpcUtils.list.getUserLists.invalidate();
    },
  });

  return {
    deleteList: mutate,
  };
};
