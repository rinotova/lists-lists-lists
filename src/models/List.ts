import { z } from "zod";

export const ListSchema = z.object({
  name: z.string().min(3, { message: "Min length for list name is 3" }),
});

export const ListItemSchema = z.object({
  text: z.string().min(3, { message: "Min length for list item name is 3" }),
  listId: z.string(),
  emoji: z.string().emoji().optional(),
});
