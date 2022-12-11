import { useGetAsync } from "../request";
import { IArticlesInput, IArticles, IArticleWithHtml, IAricleWithSummary } from './types';

export function useArticles<
  I extends IArticlesInput = IArticlesInput,
  T extends IAricleWithSummary = IAricleWithSummary, 
  U extends IArticles<T> = IArticles<T>
>(params: I) {
  return useGetAsync<U>({
    id: 'articles',
    url: '/article',
    querys: params,
  }, [params.category, params.tag, params.keyword, params.page]);
}

export function useArticle<T extends IArticleWithHtml = IArticleWithHtml>(code: string) {
  return useGetAsync<T>({
    id: 'article',
    url: '/article/' + code,
  },[code]);
}