import AddItemForm from "~/app/_components/AddItemForm";
import ListItems from "~/app/_components/ListItems";
import ListName from "~/app/_components/ListName";
import MaxWidthWrapper from "~/app/_components/MaxWidthWrapper";
import { useGetAuthorizedUserOrRedirect } from "~/hooks/useGetAuthorizedUserOrRedirect";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  await useGetAuthorizedUserOrRedirect(`/sign-in?listId=${params.id}`);
  const { name } = await api.list.addListToUserList.mutate({
    listId: params.id,
  });

  return (
    <MaxWidthWrapper className="p-4">
      <div className="flex flex-col gap-4">
        <ListName listName={name} />
        <AddItemForm listId={params.id} />
        <ListItems listId={params.id} />
      </div>
    </MaxWidthWrapper>
  );
}
