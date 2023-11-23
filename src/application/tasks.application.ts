import { and, eq } from 'drizzle-orm'
import { db } from '../db/db'
import { TaskSchema } from '../db/schema'
import { TaskCreateInput, TaskUpdateInput } from '../types';

export const fetchTasksByListId = async (listId: string) => {
  const data = await db.query.TaskSchema.findMany({
    where: and(eq(TaskSchema.listId, Number(listId)), eq(TaskSchema.archived, false)),
    orderBy: TaskSchema.id,
  });

  return data;
};

export const archiveTask = async (taskId: number) => {
  const data = await db
    .update(TaskSchema)
    .set({ archived: true })
    .where(eq(TaskSchema.id, taskId))
    .returning({
      id: TaskSchema.id,
      completed: TaskSchema.completed,
      dueDate: TaskSchema.dueDate,
      listId: TaskSchema.listId,     
      name: TaskSchema.name,
      updatedat: TaskSchema.updatedAt,
    });

  return {
    numRowsAffected: data.length,
    updatedTasks: data,
  };
}

export const createTask = async (input: TaskCreateInput) => {
  const data = await db
    .insert(TaskSchema)
    .values(input)
    .returning({
      id: TaskSchema.id,
      name: TaskSchema.name,
      completed: TaskSchema.completed,
      dueDate: TaskSchema.dueDate,
      listId: TaskSchema.listId,
    });

  return data;
};

export const deleteTask = async (taskId: number) => {
  const data = await db.delete(TaskSchema).where(eq(TaskSchema.id, taskId)).returning({
    id: TaskSchema.id,
  });

  return {
    numRowsAffected: data.length,
    deletedTaskIds: data,
  };
};

export const updateTask = async (input: TaskUpdateInput) => {
  const data = await db
    .update(TaskSchema)
    .set({
      completed: input.completed,
      dueDate: input.dueDate,
      listId: Number(input.listId),
      name: input.name,
      updatedAt: new Date(),
    })
    .where(eq(TaskSchema.id, Number(input.id)))
    .returning({
      id: TaskSchema.id,
      completed: TaskSchema.completed,
      dueDate: TaskSchema.dueDate,
      listId: TaskSchema.listId,     
      name: TaskSchema.name,
      updatedat: TaskSchema.updatedAt,
    });

  return {
    numRowsAffected: data.length,
    updatedTasks: data,
  }
}
