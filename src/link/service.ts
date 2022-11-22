import { AxiosRequestConfig } from 'axios';
import { request } from '../request';
import { ILink } from './types';

export async function getHttpLinks(size: number = 0, configs: AxiosRequestConfig = {}) {
  if (size) {
    configs.params = {
      size,
    }
  }
  const res = await request.get<ILink[]>('/link', configs);
  return res.data;
}

getHttpLinks.namespace = (size: number = 0) => `links:${size}`

export async function setHttpLink(name: string, icon: string, url: string) {
  const res = await request.post('/link', { name, icon, url });
  return res.data;
}

export async function getHttpTableLink(configs: AxiosRequestConfig = {}) {
  const res = await request.get<ILink[]>('/link/topables', configs);
  return res.data;
}

getHttpTableLink.namespace = 'links:topable';