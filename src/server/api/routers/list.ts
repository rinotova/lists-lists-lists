import { TRPCError } from "@trpc/server";
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
      const { name, emoji } = input;

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
            emoji,
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

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "A list name must be unique",
      });
    }),
  addListToUserList: protectedProcedure
    .input(GetListSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { listId } = input;

      const existingList = await ctx.db.list.findUnique({
        where: {
          name: listId,
          userIDs: { has: userId },
        },
      });

      // If the user is not in the list, add them
      if (!existingList) {
        return await ctx.db.list.update({
          where: { id: listId },
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
        emoji: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }),
  getListName: protectedProcedure
    .input(GetListSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { listId } = input;
      return ctx.db.list.findUnique({
        where: {
          id: listId,
          userIDs: { has: userId },
        },
        select: {
          name: true,
        },
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
        select: {
          complete: true,
          emoji: true,
          id: true,
          listId: true,
          text: true,
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
      const { text, id, emoji, complete } = input;

      return ctx.db.listItem.update({
        where: {
          id,
        },
        data: {
          text,
          emoji,
          complete,
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

      const list = await ctx.db.list.findUnique({
        where: {
          id: listId,
        },
      });

      if (!list) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "List does not exist",
        });
      }
      const userIds = [...list.userIDs];
      const userIdindex = userIds.indexOf(userId);
      if (userIdindex !== -1) {
        userIds.splice(userIdindex, 1);
      }

      if (userIds.length === 0) {
        return ctx.db.list.delete({
          where: {
            id: listId,
            userIDs: { has: userId },
          },
        });
      }

      return ctx.db.list.update({
        data: {
          userIDs: {
            set: userIds,
          },
        },
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
