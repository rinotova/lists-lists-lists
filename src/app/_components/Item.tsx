"use client";

import { useLongPress } from "use-long-press";
import { Card, CardContent } from "./ui/card";
import { type ListItem } from "~/models/List";
import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import { useRemoveItemFromList } from "~/hooks/useRemoveItemFromList";
import { cn } from "~/lib/utils";
import { useEditListItem } from "~/hooks/useEditListItem";
import EditItemForm from "./EditItemForm";
import Link from "next/link";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

function checkForUrlInItemName(text: string) {
  const urlMatch = text.match(/\bhttps?:\/\/\S+/gi);
  let itemText = text;
  let link;
  if (urlMatch?.length) {
    link = urlMatch[0];
    itemText = itemText.replace(link, "");
  }

  return {
    itemText,
    link,
  };
}

function Item({ item, listId }: { item: ListItem; listId: string }) {
  const { deleteItem } = useRemoveItemFromList(listId);
  const { editItem } = useEditListItem(listId);
  const toggleItemHanlder = () => {
    editItem({ ...item, complete: !item.complete });
  };

  const itemLongPressHandler = useLongPress(() => {
    toast({
      description: item.text,
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  });

  const { itemText, link } = checkForUrlInItemName(item.text);

  return (
    <div className="flex flex-col gap-4" {...itemLongPressHandler()}>
      <SwipeToRevealActions
        actionButtons={[
          {
            content: <EditItemForm item={item} />,
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
            onClick: () => deleteItem({ itemId: item.id }),
          },
        ]}
        actionButtonMinWidth={70}
      >
        <Card
          onClick={toggleItemHanlder}
          className={cn(
            `flex w-full cursor-pointer items-center rounded-none bg-blue-300 drop-shadow-sm dark:bg-blue-900`,
            {
              "bg-slate-200 text-zinc-500 line-through dark:bg-gray-700":
                item.complete,
            },
          )}
        >
          <CardContent className="flex items-center justify-center gap-4 p-4 pt-4 text-lg">
            <p className="max-w-[250px] truncate text-ellipsis sm:max-w-[500px]">
              {itemText}
            </p>
            {item.emoji ? (
              <span className="text-3xl">
                {String.fromCodePoint(item.emoji)}
              </span>
            ) : null}
          </CardContent>
        </Card>
      </SwipeToRevealActions>

      {link && (
        <Link
          className="-mt-2 max-w-[250px] truncate text-ellipsis pl-6 text-sm underline sm:max-w-[500px]"
          href={link}
          target="_blank"
        >
          {link}
        </Link>
      )}
    </div>
  );
}

export default Item;
