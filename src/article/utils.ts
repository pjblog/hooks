import { IArticlesInput } from './types';
import { redirect, replace } from '@codixjs/codix';

export function createArticlesLocation(params: IArticlesInput = {}) {
  const { category, tag, keyword, page } = params;
  const _params = {
    category: category + '', 
    tag: tag + '', 
    keyword: null, 
    page: page + '', 
  }
  if (!category) Reflect.deleteProperty(_params, 'category');
  if (!tag) Reflect.deleteProperty(_params, 'tag');
  if (!keyword) Reflect.deleteProperty(_params, 'keyword');
  if (!page || page === 1) Reflect.deleteProperty(_params, 'page');

  return {
    redirect: () => redirect('/', _params),
    replace: () => replace('/', _params),
  }
}

export function createArticleLocation(code: string) {
  return {
    redirect: () => redirect('/article/' + code),
    replace: () => replace('/article/' + code),
  }
}