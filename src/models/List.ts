import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";

import { type AppRouter } from "~/server/api/root";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type userLists = RouterOutputs["list"]["getUserLists"];
type listItemsList = RouterOutputs["list"]["getListItems"];

export type UserList = userLists[number];
export type ListItem = listItemsList[number];

export const ListSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Min length for list name is 3" }),
});

export const ListItemSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(3, { message: "Min length for list item name is 3" }),
  listId: z.string(),
  emoji: z.string().emoji().optional(),
});

export const GetListSchema = z.object({ listId: z.string() });

export const GetListItemSchema = z.object({ itemId: z.string() });
