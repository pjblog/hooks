import { IArticlesInput } from './types';

export function createArticlesQuery(params: IArticlesInput = {}) {
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
  return _params;
}