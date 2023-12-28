"use client";
import React from "react";
import UserListItem from "./UserListItem";
import { api } from "~/trpc/react";

function UserLists() {
  const userLists = api.list.getUserLists.useQuery();

  return (
    <div className="flex flex-col gap-2">
      {userLists.data?.map((item) => (
        <UserListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default UserLists;
