import React from "react";
import { Card, CardContent } from "./ui/card";
import { type ListItem } from "~/models/List";

function Item({ item }: { item: ListItem }) {
  return (
    <Card className="flex items-center rounded-none bg-blue-300 drop-shadow-sm">
      <CardContent className="flex items-center  gap-2 p-4 pt-4 text-lg">
        <p className="break-all">{item.text}</p>
      </CardContent>
    </Card>
  );
}

export default Item;
