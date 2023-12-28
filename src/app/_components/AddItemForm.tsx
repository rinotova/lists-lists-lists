"use client";

import { Input } from "./ui/input";
import { PlusSquare } from "lucide-react";
import { useAddItemToList } from "~/hooks/useAddItemToList";
import { useAddListToUser } from "~/hooks/useAddListToUser";

function AddItemForm({ listId }: { listId?: string }) {
  const addListToUser = useAddListToUser();
  const addItemToList = useAddItemToList({ listId });

  const { addItemHandler, itemName, setItemName, isLoading } = listId
    ? addItemToList
    : addListToUser;
  const disableSubmitButton = !itemName || isLoading;

  return (
    <form
      onSubmit={addItemHandler}
      className="flex h-12 w-full items-center justify-center gap-2"
    >
      <Input
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder={!!listId ? "New item text..." : "New list name..."}
        className="h-12 text-center text-2xl drop-shadow-md"
      />
      <button
        type="submit"
        disabled={disableSubmitButton}
        className="cursor-pointer hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusSquare className="h-14 w-14  stroke-1 " />
      </button>
    </form>
  );
}

export default AddItemForm;
