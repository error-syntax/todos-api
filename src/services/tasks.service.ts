import * as TasksApplcation from '../application/tasks.application';

export const fetchTasksByListId = async (listId: string) => {
  const response = await TasksApplcation.fetchTasksByListId(listId);

  return response;
}