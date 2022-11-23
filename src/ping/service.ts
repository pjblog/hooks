import { request } from '../request';

export async function getHttpPing() {
  const res = await request.get('/ping');
  return res.data;
}