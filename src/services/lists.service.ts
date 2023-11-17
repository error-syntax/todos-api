import { z } from 'zod';
import * as ListsApplication from '../application/lists.application';
import { ListCreateInput, ListUpdateInput } from '../types';
import validate from './validation';

const ListCreateSchema = z.object({
  name: z.string(),
  ownerId: z.number(),
});

const ListUpdateSchema = z.object({
  name: z.string(),
  id: z.number(),
})

export const fetchListByUserId = async (userId: number) => {
  const data = await ListsApplication.fetchListByUserId(userId);

  return data;
};

export const createList = async (input: ListCreateInput) => {
  validate<Required<ListCreateInput>>(ListCreateSchema, input);

  const data = await ListsApplication.createList(input);

  return data;
};

export const deleteLists = async (listIds: number[]) => {
  const data = await ListsApplication.deleteLists(listIds);

  return data;
};

export const updateList = async (input: ListUpdateInput) => {
  validate<Required<ListUpdateInput>>(ListUpdateSchema, input);

  const data = await ListsApplication.updateList(input);

}