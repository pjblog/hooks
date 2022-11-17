import { AxiosRequestConfig } from 'axios';
import { request } from '../request';
import { ICategory } from './types';

export async function getHttpCategories(configs: AxiosRequestConfig = {}) {
  const res = await request.get<ICategory[]>('/category', configs);
  return res.data;
}

getHttpCategories.namespace = 'categories';