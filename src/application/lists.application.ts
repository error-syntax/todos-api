import { eq, inArray } from 'drizzle-orm'
import { db } from '../db/db'
import { ListSchema } from '../db/schema';
import { ListCreateInput, ListUpdateInput } from '../types';

export const fetchListByUserId = async (userId: number) => {
  const data = await db.query.ListSchema.findMany({
    where: eq(ListSchema.ownerId, userId),
    orderBy: ListSchema.id,
  });

  return data;
};

export const createList = async (input: Required<ListCreateInput>) => {
  const data = await db
    .insert(ListSchema)
    .values({
      name: input.name,
      ownerId: input.ownerId,
    })
    .returning({
      archived: ListSchema.archived,
      id: ListSchema.id,
      name: ListSchema.name,
    });

  return data;
};

export const deleteLists = async (listIds: number[]) => {
  const data = await db
    .delete(ListSchema)
    .where(inArray(ListSchema.id, listIds))
    .returning({ listId: ListSchema.id });

    return {
      numRowsAffected: data.length,
      deletedIds: data,
    };
};

export const updateList = async (input: Required<ListUpdateInput>) => {
  const data = await db
    .update(ListSchema)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(ListSchema.id, input.id))
    .returning({
      archived: ListSchema.archived,
      id: ListSchema.id,
      name: ListSchema.name,
    });

    return data;
}