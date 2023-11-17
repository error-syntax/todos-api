import { eq } from 'drizzle-orm'
import { db } from '../db/db'
import { TaskSchema } from '../db/schema'

export const fetchTasksByListId = async (listId: string) => {
  const data = await db.query.TaskSchema.findMany({
    where: eq(TaskSchema.listId, Number(listId)),
  });

  return data;
}