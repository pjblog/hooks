import { IUser } from "./types";
import { request } from '../request';
import type { AxiosRequestConfig } from 'axios';

export function createDefaultUserState(): IUser {
  return {
    id: 0,
    account: null,
    nickname: null,
    email: null,
    avatar: null,
    forbiden: false,
    level: 1,
    website: null,
    gmt_create: new Date(),
    gmt_modified: new Date(),
  }
}

export async function getHttpMyInfo(configs: AxiosRequestConfig = {}) {
  const res = await request.get<IUser>('/me', configs);
  return res.data;
}

getHttpMyInfo.namespace = 'userinfo';

export async function setHttpLogout() {
  const res = await request.delete('/logout');
  return res.data;
}

export async function setHttpLogin(account: string, password: string) {
  const res = await request.put('/login', { account, password });
  return res.data;
}

export async function setHttpRegister(account: string, password: string) {
  const res = await request.post('/user', { account, password });
  return res.data;
}

export async function setHttpProfile(nickname: string, email: string, avatar?: string, website?: string) {
  const res = await request.put('/user', { nickname, email, avatar, website });
  return res.data;
}

export async function setHttpPassword(oldPassword: string, newPassword: string, comPassword: string) {
  const res = await request.put('/me/password', {
    oldPassword, newPassword, comPassword,
  })
  return res.data;
}