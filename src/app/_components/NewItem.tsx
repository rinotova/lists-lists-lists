"use client";

import { Input } from "./ui/input";
import { PlusSquare } from "lucide-react";
import { useAddListToUser } from "~/hooks/useAddListToUser";

function NewItem() {
  const { addItemHandler, itemName, setItemName, isLoading } =
    useAddListToUser();
  const disableSubmitButton = !itemName || isLoading;
  return (
    <form
      onSubmit={addItemHandler}
      className="flex h-12 w-full items-center justify-center gap-2"
    >
      <Input
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="New list name..."
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

export default NewItem;
