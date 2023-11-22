import { z } from 'zod';
import * as TasksApplcation from '../application/tasks.application';
import { TaskCreateInput, TaskUpdateInput } from '../types';
import validate from './validation';

const TaskCreateSchema = z.object({
  listId: z.number(),
  name: z.string().max(255, 'Task Name must be under 255 characters.'),
  completed: z.boolean().optional(),
  dueDate:  z.string().optional(),
});

const TaskUpdateSchema = z.object({
  id: z.number(),
  listId: z.number().optional(),
  name: z.string().max(255, 'Task Name can\'t be more than 255 characters.').optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().optional(),
})

export const fetchTasksByListId = async (listId: string) => {
  const data = await TasksApplcation.fetchTasksByListId(listId);

  return data;
}

export const archiveTask = async (taskId: string) => {
  const data = await TasksApplcation.archiveTask(Number(taskId));

  return data;
}

export const createTask = async (input: Partial<TaskCreateInput>) => {
  validate<TaskCreateInput>(TaskCreateSchema, input);

  const data = await TasksApplcation.createTask(input);

  return data;
}

export const deleteTask = async (taskId: string) => {
  const data = await TasksApplcation.deleteTask(Number(taskId));

  return data;
}

export const updateTask = async (input: Partial<TaskUpdateInput>) => {
  validate<TaskUpdateInput>(TaskUpdateSchema, input);

  const data = await TasksApplcation.updateTask(input);

  return data;
}
