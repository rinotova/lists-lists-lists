import { ListItemSchema, ListSchema } from "~/models/List";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const listRouter = createTRPCRouter({
  addItemToList: protectedProcedure
    .input(ListItemSchema)
    .mutation(async ({ ctx, input }) => {
      const { text, listId, emoji } = input;

      return ctx.db.listItem.create({
        data: {
          text,
          emoji,
          list: {
            connect: {
              id: listId,
            },
          },
        },
      });
    }),
  addListToUser: protectedProcedure
    .input(ListSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { name } = input;

      const existingList = await ctx.db.list.findFirst({
        where: {
          name: name,
          userIDs: { has: userId },
        },
      });

      if (!existingList) {
        return ctx.db.list.create({
          data: {
            name: name,
            userIDs: [userId],
          },
        });
      }

      // If the user is not in the list, add them
      if (!existingList.userIDs.includes(userId)) {
        return await ctx.db.list.update({
          where: { id: existingList.id },
          data: {
            userIDs: { push: userId },
          },
        });
      }

      return existingList;
    }),
});
