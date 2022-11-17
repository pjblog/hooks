import { AxiosRequestConfig } from 'axios';
import { request } from '../request';
import { IArticlesInput, IArticles, IArticleWithHtml, IArticleRelative } from './types';

export async function getHttpArticles(options: IArticlesInput = {}, configs: AxiosRequestConfig = {}) {
  const res = await request.get<IArticles>('/article', Object.assign(configs, {
    params: options,
  }));
  return res.data;
}

getHttpArticles.namespace = (options: IArticlesInput = {}) => `articles:${options.keyword}:${options.tag || 0}:${options.category || 0}:${options.page || 1}`;

export async function getHttpArticle(id: string, configs: AxiosRequestConfig = {}) {
  const res = await request.get<IArticleWithHtml>('/article/' + id, configs);
  return res.data;
}

getHttpArticle.namespace = (id: string) => `article:${id}`;

export async function getHttpRelativeArticles(id: number, size: number = 5, configs: AxiosRequestConfig = {}) {
  const res = await request.get<IArticleRelative[]>('/article/' + id + '/relative', Object.assign(configs, {
    params: {
      size
    }
  }))
  return res.data;
}

getHttpRelativeArticles.namespace = (id: number, size: number = 5) => `getRelativeArticles:${id}:${size}`;