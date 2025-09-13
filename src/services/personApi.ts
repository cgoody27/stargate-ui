import { api } from '../helpers/http';
import type { Person, BaseResponse } from '../models/models';

export const getPeople = () => api.get<Person[]>('/Person');
export const getPersonByName = (name: string) => api.get<Person>(`/Person/${encodeURIComponent(name)}`);

// Controller expects a raw string in body for create
export const createPerson = (name: string) =>
  api.post<BaseResponse>('/Person/create', name);

// Controller expects a full Person body for update
export const updatePerson = (person: Person) =>
  api.put<BaseResponse>('/Person/update', person);