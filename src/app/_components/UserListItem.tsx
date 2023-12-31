"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { type UserList } from "~/models/List";
import Link from "next/link";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import { useRemoveListFromUser } from "~/hooks/useRemoveListFromUser";
import { toast } from "./ui/use-toast";
import EditListForm from "./EditListForm";

function UserListItem({ item }: { item: UserList }) {
  const { deleteList } = useRemoveListFromUser();
  return (
    <SwipeToRevealActions
      actionButtons={[
        {
          content: (
            <div className="flex h-full w-full cursor-pointer items-center justify-center bg-blue-500 text-white">
              <span>SHARE</span>
            </div>
          ),
          onClick: () => {
            void navigator.clipboard.writeText(
              `${window.location.origin}/list/${item.id}`,
            );
            toast({
              title: "Link copied!",
              description: "Anyone with a link can view and edit the list",
              variant: "default",
              duration: 3000,
            });
          },
        },
        {
          content: <EditListForm list={item} />,
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
          onClick: () => deleteList({ listId: item.id }),
        },
      ]}
      actionButtonMinWidth={70}
    >
      <Link className="w-full" href={`/list/${item.id}`}>
        <Card className="flex items-center rounded-none bg-orange-300 drop-shadow-sm dark:dark:bg-slate-700">
          <CardContent className="flex items-center gap-2 p-4 pt-4 text-lg">
            <p className="break-all">{item.name}</p>
            {item.emoji ? (
              <span className="text-3xl">
                {String.fromCodePoint(item.emoji)}
              </span>
            ) : null}
          </CardContent>
        </Card>
      </Link>
    </SwipeToRevealActions>
  );
}

export default UserListItem;
