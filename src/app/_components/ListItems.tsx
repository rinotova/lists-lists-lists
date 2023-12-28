"use client";

import React from "react";
import { api } from "~/trpc/react";
import Item from "./Item";

function ListItems({ listId }: { listId: string }) {
  const listItems = api.list.getListItems.useQuery({ listId });

  if (!listItems.isFetching && !listItems.data?.length) {
    return <p className="w-full text-center">No items in list.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {listItems.data?.map((item) => <Item key={item.id} item={item} />)}
    </div>
  );
}

export default ListItems;
