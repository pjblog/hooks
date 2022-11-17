import { AxiosRequestConfig } from 'axios';
import { request } from '../request';
import { IComment, ICommentList } from './types';

export async function setHttpComment(aid: number, pid: number, text: string) {
  const res = await request.post<IComment>('/comment', {
    aid, pid, text,
  })
  return res.data;
}

export async function getHttpComments(aid: number, index: number = 0, configs: AxiosRequestConfig = {}) {
  const res = await request.get<ICommentList>(`/article/${aid}/comments`, Object.assign(configs, {
    params: {
      index
    }
  }));
  return res.data;
}

getHttpComments.namespace = (aid: number, index: number = 0) => `comments:${aid}:index:${index}`;