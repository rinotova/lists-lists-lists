import React from "react";
import { Card, CardContent } from "./ui/card";

function ListName() {
  return (
    <Card className="flex items-center rounded-none bg-blue-700 text-white drop-shadow-sm">
      <CardContent className="flex w-full items-center justify-center gap-2 p-1 pt-1 text-lg">
        <p className="break-all">{"List name"}</p>
      </CardContent>
    </Card>
  );
}

export default ListName;
