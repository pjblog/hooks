import { useAsync } from "@codixjs/fetch";
import { useRequestConfigs } from "../request";
import { getHttpArticle, getHttpArticles, getHttpRelativeArticles } from "./service";
import { IArticlesInput } from './types';

export function useArticles(params: IArticlesInput) {
  const configs = useRequestConfigs();
  return useAsync(
    getHttpArticles.namespace(params), 
    () => getHttpArticles(params, configs), 
    [params.category, params.tag, params.keyword, params.page]
  );
}

export function useArticle(code: string) {
  const configs = useRequestConfigs();
  return useAsync(
    getHttpArticle.namespace(code), 
    () => getHttpArticle(code, configs), 
    [code]
  );
}

export function useRelativeArticles(id: number, size: number) {
  const configs = useRequestConfigs();
  return useAsync(
    getHttpRelativeArticles.namespace(id, size), 
    () => getHttpRelativeArticles(id, size, configs), 
    [id, size]
  )
}