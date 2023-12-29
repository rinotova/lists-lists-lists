"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { type ListItem } from "~/models/List";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import { useRemoveItemFromList } from "~/hooks/useRemoveItemFromList";

function Item({ item, listId }: { item: ListItem; listId: string }) {
  const { deleteItem } = useRemoveItemFromList(listId);
  return (
    <SwipeToRevealActions
      actionButtons={[
        {
          content: (
            <div className="your-className-here">
              <span>EDIT</span>
            </div>
          ),
          onClick: () => alert("Pressed the EDIT button"),
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
      <Card className="flex w-full items-center rounded-none bg-blue-300 drop-shadow-sm">
        <CardContent className="flex items-center  gap-2 p-4 pt-4 text-lg">
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
