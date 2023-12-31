"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { type ListItem } from "~/models/List";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import { useRemoveItemFromList } from "~/hooks/useRemoveItemFromList";
import { cn } from "~/lib/utils";
import { useEditListItem } from "~/hooks/useEditListItem";
import EditItemForm from "./EditItemForm";

function Item({ item, listId }: { item: ListItem; listId: string }) {
  const { deleteItem } = useRemoveItemFromList(listId);
  const { editItem } = useEditListItem(listId);
  const toggleItemHanlder = () => {
    editItem({ ...item, complete: !item.complete });
  };

  return (
    <SwipeToRevealActions
      actionButtons={[
        {
          content: <EditItemForm item={item} />,
          onClick: () => {
            //
          },
        },
        {
          content: (
            <div className="flex h-full w-full cursor-pointer items-center justify-center bg-red-500 text-white">
              <span>DELETE</span>
            </div>
          ),
          onClick: () => deleteItem({ itemId: item.id }),
        },
      ]}
      actionButtonMinWidth={70}
    >
      <Card
        onClick={toggleItemHanlder}
        className={cn(
          `flex w-full cursor-pointer items-center rounded-none bg-blue-300 drop-shadow-sm dark:bg-blue-900`,
          {
            "bg-slate-200 text-zinc-500 line-through dark:bg-gray-700":
              item.complete,
          },
        )}
      >
        <CardContent className="flex items-center gap-2 p-4 pt-4 text-lg">
          <p className="break-all">{item.text}</p>
          {item.emoji ? (
            <span className="text-3xl">{String.fromCodePoint(item.emoji)}</span>
          ) : null}
        </CardContent>
      </Card>
    </SwipeToRevealActions>
  );
}

export default Item;
