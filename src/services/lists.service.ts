import * as ListsApplication from '../application/lists.application';
import { ListCreateInput } from '../types';

export const fetchListByUserId = async (userId: string) => {
  const response = await ListsApplication.fetchListByUserId(userId);

  return response;
};

export const createList = async (input: ListCreateInput) => {
  const response = await ListsApplication.createList(input);

  return response;
}