import MD5 from 'crypto-js/md5.js';
import { useAsync, Client } from '@codixjs/fetch';
import { DependencyList, useMemo } from 'react';
import { useRequestConfigs } from './config';
import { request } from './request';
import { AxiosRequestConfig } from 'axios';

const HttpReuestCodes = new Map<string, string>();

export function reloadHttpRequest(client: Client, ...ids: string[]) {
  const codes = ids.map(id => {
    if (HttpReuestCodes.has(id)) {
      return HttpReuestCodes.get(id);
    }
  }).filter(Boolean);
  if (codes.length) {
    client.reload(...codes);
  }
}

function createHttpRequestCode(id: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, encode: string) {
  const md5 = MD5(method + ':' + url + ':' + (encode || '')).toString();
  HttpReuestCodes.set(id, md5);
  return md5;
}

function merge(configs: AxiosRequestConfig, options: AxiosRequestConfig) {
  options.headers = options.headers 
    ? Object.assign({}, options.headers, configs.headers) 
    : configs.headers;
  return Object.assign({}, configs, options);
}

export function useGetAsync<T = any>(
  options: {
    id: string,
    url: string, 
    querys?: object, 
    headers?: object, 
    plugin?: string,
    encode?: string,
  },
  deps?: DependencyList,
) {
  const configs = useRequestConfigs();
  options.url = options.plugin ? createPluginURL(options.plugin, options.url) : options.url;
  const code = useMemo(() => createHttpRequestCode(options.id, 'GET', options.url, options.encode), [options.id, options.url, options.encode]);
  return useAsync(code, async () => {
    const res = await request.get<T>(options.url, merge(configs, {
      params: options.querys,
      headers: options.headers,
    }))
    return res.data;
  }, deps);
}

export function usePostAsync<T = any>(
  options: {
    id: string,
    url: string,
    querys?: object, 
    headers?: object, 
    data?: object,
    plugin?: string,
    encode?: string,
  },
  deps?: DependencyList,
) {
  const configs = useRequestConfigs();
  options.url = options.plugin ? createPluginURL(options.plugin, options.url) : options.url;
  const code = useMemo(() => createHttpRequestCode(options.id, 'POST', options.url, options.encode), [options.id, options.url, options.encode]);
  return useAsync(code, async () => {
    const res = await request.post<T>(options.url, options.data, merge(configs, {
      params: options.querys,
      headers: options.headers,
    }))
    return res.data;
  }, deps);
}

export function usePutAsync<T = any>(
  options: {
    id: string,
    url: string,
    querys?: object, 
    headers?: object, 
    data?: object,
    plugin?: string,
    encode?: string,
  },
  deps?: DependencyList,
) {
  const configs = useRequestConfigs();
  options.url = options.plugin ? createPluginURL(options.plugin, options.url) : options.url;
  const code = useMemo(() => createHttpRequestCode(options.id, 'PUT', options.url, options.encode), [options.id, options.url, options.encode]);
  return useAsync(code, async () => {
    const res = await request.put<T>(options.url, options.data, merge(configs, {
      params: options.querys,
      headers: options.headers,
    }))
    return res.data;
  }, deps);
}

export function useDelAsync<T = any>(
  options: {
    id: string,
    url: string, 
    querys?: object, 
    headers?: object, 
    plugin?: string,
    encode?: string,
  },
  deps?: DependencyList,
) {
  const configs = useRequestConfigs();
  options.url = options.plugin ? createPluginURL(options.plugin, options.url) : options.url;
  const code = useMemo(() => createHttpRequestCode(options.id, 'DELETE', options.url, options.encode), [options.id, options.url, options.encode]);
  return useAsync(code, async () => {
    const res = await request.delete<T>(options.url, merge(configs, {
      params: options.querys,
      headers: options.headers,
    }))
    return res.data;
  }, deps);
}

function createPluginURL(name: string, url: string = '/') {
  name = name.startsWith('pjblog-plugin-') ? name : 'pjblog-plugin-' + name;
  return '/plugin/' + name + (url === '/' ? '' : url);
}