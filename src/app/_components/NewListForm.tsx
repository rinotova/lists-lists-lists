"use client";

import React, { type FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { PlusSquare } from "lucide-react";
import { ListSchema, type UserList } from "~/models/List";
import { useToast } from "./ui/use-toast";
import { api } from "~/trpc/react";

function NewListForm() {
  const [listName, setListName] = useState("");
  const trpcUtils = api.useUtils();

  const { toast } = useToast();
  const { mutate } = api.list.addListToUser.useMutation({
    onMutate: async (newList) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update.
      await trpcUtils.list.getUserLists.cancel();

      // Snapshot of the previous value
      const previousLists = trpcUtils.list.getUserLists.getData();

      // Optimistically update to the new value
      trpcUtils.list.getUserLists.setData(undefined, (prev) => {
        const optimisticList: UserList = {
          id: "optimisticListId",
          name: newList.name,
        };
        if (!prev) {
          return [optimisticList];
        }
        return [optimisticList, ...prev];
      });
      setListName("");
      return { previousLists };
    },
    onError: (err, newList, context) => {
      toast({
        title: "Error",
        description: "There was an error when creating the list",
        variant: "destructive",
        duration: 2500,
      });
      setListName("");
      trpcUtils.list.getUserLists.setData(
        undefined,
        () => context?.previousLists,
      );
    },
    onSettled: async () => {
      console.log("invalidating");
      await trpcUtils.list.getUserLists.invalidate();
    },
  });

  const newListHandler = (e: FormEvent) => {
    e.preventDefault();
    const inputParseResult = ListSchema.safeParse({
      name: listName,
    });

    if (inputParseResult.success) {
      mutate({
        name: listName,
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
  return (
    <form
      onSubmit={newListHandler}
      className="flex h-12 w-full items-center justify-center gap-2"
    >
      <Input
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="New list name..."
        className="h-12 text-center text-2xl drop-shadow-md"
      />
      <button
        type="submit"
        disabled={!listName}
        className="cursor-pointer hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <PlusSquare className="h-14 w-14  stroke-1 " />
      </button>
    </form>
  );
}

export default NewListForm;
