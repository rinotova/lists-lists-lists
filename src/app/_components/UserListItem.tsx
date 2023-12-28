import React from "react";
import { Card, CardContent } from "./ui/card";
import { type UserList } from "~/models/List";
import Link from "next/link";

function UserListItem({ item }: { item: UserList }) {
  return (
    <Link href={`/list/${item.id}`}>
      <Card className="flex items-center bg-orange-300  drop-shadow-sm">
        <CardContent className="flex items-center  gap-2 p-4 pt-4 text-lg">
          <p className="break-all">{item.name}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default UserListItem;
