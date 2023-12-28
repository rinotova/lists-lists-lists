import UserLists from "../_components/UserLists";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import AddItemForm from "../_components/AddItemForm";
import { useGetAuthorizedUserOrRedirect } from "~/hooks/useGetAuthorizedUserOrRedirect";

async function Lists() {
  await useGetAuthorizedUserOrRedirect();

  return (
    <MaxWidthWrapper className="p-4">
      <div className="flex flex-col gap-4">
        <AddItemForm />
        <UserLists />
      </div>
    </MaxWidthWrapper>
  );
}

export default Lists;
