import React from "react";
import { Card, CardContent } from "./ui/card";
import { type UserList } from "~/models/List";

function UserListItem({ item }: { item: UserList }) {
  return (
    <Card className="flex items-center bg-lime-50 drop-shadow-sm">
      <CardContent className="flex items-center  gap-2 p-4 pt-4 text-lg">
        <p className="break-all">{item.name}</p>
      </CardContent>
    </Card>
  );
}

export default UserListItem;
