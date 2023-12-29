"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { type UserList } from "~/models/List";
import Link from "next/link";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import { useRemoveListFromUser } from "~/hooks/useRemoveListFromUser";

function UserListItem({ item }: { item: UserList }) {
  const { deleteList } = useRemoveListFromUser();
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
          onClick: () => deleteList({ listId: item.id }),
        },
      ]}
      actionButtonMinWidth={70}
    >
      <Link className="w-full" href={`/list/${item.id}`}>
        <Card className="flex items-center rounded-none bg-orange-300 drop-shadow-sm">
          <CardContent className="flex items-center  gap-2 p-4 pt-4 text-lg">
            <p className="break-all">{item.name}</p>
          </CardContent>
        </Card>
      </Link>
    </SwipeToRevealActions>
  );
}

export default UserListItem;
