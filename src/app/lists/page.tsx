import UserLists from "../_components/UserLists";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";
import NewListForm from "../_components/NewListForm";

function Lists() {
  return (
    <MaxWidthWrapper className="p-4">
      <div className="flex flex-col gap-4">
        <NewListForm />
        <UserLists />
      </div>
    </MaxWidthWrapper>
  );
}

export default Lists;
