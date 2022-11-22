import { AxiosRequestConfig } from 'axios';
import { request } from '../request';
import { IPage } from './types';

export async function getHttpPage(id: string, configs: AxiosRequestConfig = {}) {
  const res = await request.get<IPage>('/page/' + id, configs);
  return res.data;
}

getHttpPage.namespace = (id: string) => `page:${id}`;