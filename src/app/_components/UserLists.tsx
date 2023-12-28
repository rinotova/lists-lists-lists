"use client";

import React from "react";
import UserListItem from "./UserListItem";
import { api } from "~/trpc/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function UserLists() {
  const [parent] = useAutoAnimate();
  const userLists = api.list.getUserLists.useQuery();

  if (!userLists.isFetching && !userLists.data?.length) {
    return <p className="w-full text-center">No lists yet.</p>;
  }

  return (
    <div ref={parent} className="flex flex-col gap-2">
      {userLists.data?.map((item) => (
        <UserListItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default UserLists;
