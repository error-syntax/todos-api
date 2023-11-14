import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { ListSchema } from "../db/schema";
import { ListCreateInput } from "../types";

export const fetchListByUserId = async (userId: string) => {
  const data = await db.query.ListSchema.findMany({
    where: eq(ListSchema.ownerId, Number(userId)),
  });

  return data;
};

export const createList = async (input: ListCreateInput) => {
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
}