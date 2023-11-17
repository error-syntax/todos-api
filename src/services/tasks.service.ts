import * as TasksApplcation from '../application/tasks.application';

export const fetchTasksByListId = async (listId: string) => {
  const data = await TasksApplcation.fetchTasksByListId(listId);

  return data;
}