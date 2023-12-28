import {
  GetListItemSchema,
  GetListSchema,
  ListItemSchema,
  ListSchema,
} from "~/models/List";

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
  getUserLists: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.list.findMany({
      where: {
        userIDs: { has: userId },
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }),
  getListItems: protectedProcedure
    .input(GetListSchema)
    .query(async ({ ctx, input }) => {
      const { listId } = input;
      return ctx.db.listItem.findMany({
        where: {
          listId,
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });
    }),
  updateListItem: protectedProcedure
    .input(ListItemSchema)
    .mutation(async ({ ctx, input }) => {
      const { text, id, emoji } = input;

      return ctx.db.listItem.update({
        where: {
          id,
        },
        data: {
          text,
          emoji,
        },
      });
    }),
  updateList: protectedProcedure
    .input(ListSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { name, id } = input;

      return ctx.db.list.update({
        where: {
          id,
          userIDs: { has: userId },
        },
        data: {
          name,
        },
      });
    }),
  removeList: protectedProcedure
    .input(GetListSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { listId } = input;

      return ctx.db.list.delete({
        where: {
          id: listId,
          userIDs: { has: userId },
        },
      });
    }),
  removeListItem: protectedProcedure
    .input(GetListItemSchema)
    .mutation(async ({ ctx, input }) => {
      const { itemId } = input;

      return ctx.db.listItem.delete({
        where: {
          id: itemId,
        },
      });
    }),
});
