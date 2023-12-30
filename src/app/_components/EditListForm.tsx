"use client";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { type FormEvent, useState } from "react";
import { getSuggestedEmoji } from "~/lib/utils";
import { ListSchema, type UserList } from "~/models/List";
import { Input } from "./ui/input";
import { PlusSquare } from "lucide-react";
import { toast } from "./ui/use-toast";
import { useEditList } from "~/hooks/useEditList";

function EditListForm({ list }: { list: UserList }) {
  const { editList } = useEditList();
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState(list.name);

  const onEditHandler = (e: FormEvent) => {
    e.preventDefault();
    const suggestedEmoji = getSuggestedEmoji(listName, true);

    const updatedList = {
      id: list.id,
      name: listName,
      emoji: suggestedEmoji as number | null,
    };

    const inputParseResult = ListSchema.safeParse(updatedList);

    if (inputParseResult.success) {
      editList(updatedList);
      setListName("");
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex h-full w-full cursor-pointer items-center justify-center bg-green-500 text-white">
          <span>EDIT</span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center">
        <form
          onSubmit={onEditHandler}
          className="m-3 flex h-12 w-full items-center justify-center gap-2"
        >
          <Input
            onChange={(e) => setListName(e.target.value)}
            value={listName}
            className="h-12 text-center text-2xl drop-shadow-md"
            autoFocus
          />
          <button
            type="submit"
            disabled={listName.length < 3}
            className="cursor-pointer hover:opacity-75 disabled:opacity-50"
          >
            <PlusSquare className="h-14 w-14  stroke-1 " />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditListForm;
