"use client";

import { useEditListItem } from "~/hooks/useEditListItem";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { type FormEvent, useState } from "react";
import { getSuggestedEmoji } from "~/lib/utils";
import { ListItemSchema, type ListItem } from "~/models/List";
import { Input } from "./ui/input";
import { PlusSquare } from "lucide-react";
import { toast } from "./ui/use-toast";

function EditItemForm({ item }: { item: ListItem }) {
  const { editItem } = useEditListItem(item.listId);
  const [open, setOpen] = useState(false);
  const [itemText, setItemText] = useState(item.text);

  const onEditHandler = (e: FormEvent) => {
    e.preventDefault();
    const suggestedEmoji = getSuggestedEmoji(itemText);

    const updatedItem = {
      id: item.id,
      text: itemText,
      listId: item.listId,
      complete: false,
      emoji: suggestedEmoji as number | null,
    };

    const inputParseResult = ListItemSchema.safeParse(updatedItem);

    if (inputParseResult.success) {
      editItem(updatedItem);
      setItemText("");
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
        <div className="flex flex-col items-center justify-center gap-4">
          <DialogTitle>Edit item</DialogTitle>
          <form
            onSubmit={onEditHandler}
            className="m-3 flex h-12 w-full items-center justify-center gap-2"
          >
            <Input
              onChange={(e) => setItemText(e.target.value)}
              value={itemText}
              className="h-12 text-center text-2xl drop-shadow-md"
              autoFocus
            />
            <button
              type="submit"
              disabled={itemText.length < 3}
              className="cursor-pointer hover:opacity-75 disabled:opacity-50"
            >
              <PlusSquare className="h-14 w-14  stroke-1 " />
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditItemForm;
