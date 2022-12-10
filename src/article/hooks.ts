import { useGetAsync } from "../request";
import { IArticlesInput, IArticles, IAricleWithSummary } from './types';

export function useArticles(params: IArticlesInput) {
  return useGetAsync<IArticles>({
    id: 'articles',
    url: '/article',
    querys: params,
  }, [params.category, params.tag, params.keyword, params.page]);
}

export function useArticle(code: string) {
  return useGetAsync<IAricleWithSummary>({
    id: 'article',
    url: '/article/' + code,
  },[code]);
}