import { IConfigs } from './types';
import { AxiosRequestConfig } from 'axios';
import { request } from '../request';

export function createDetaultConfigs(): IConfigs {
  return {
    close: false,
    description: null,
    name: null,
    theme: 'pjblog-theme-default',
    article_size: 10,
    comment_size: 10,
    keywords: null,
    copyright: null,
    icp: null,
    domain: null,
    favicon: null,
    visitors: 0,
    articles: 0,
    comments: 0,
    onlines: 0,
    reads: 0,
  }
}

export async function getHttpConfigs(configs: AxiosRequestConfig = {}) {
  const res = await request.get<IConfigs>('/configs', configs);
  return res.data;
}

getHttpConfigs.namespace = 'configs';