import { IArticleHead, IArticleHeaded, IArticlesInput } from './types';

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

export function transformHeadings(dataSource: IArticleHead[]): IArticleHeaded[] {
  if (!dataSource?.length) return [];
  let level: number = dataSource[0].level;
  const pools: IArticleHeaded[] = [];
  const indexs: number[] = [];

  for (let i = 0; i < dataSource.length; i++) {
    const chunk = dataSource[i];
    const children = getByIndex(pools, indexs);

    if (chunk.level > level) {
      indexs.push(children.length - 1);
      const _children = getByIndex(pools, indexs);
      _children.push({
        id: chunk.id,
        name: chunk.text,
        level: chunk.level,
        children: [],
      });
    } else if (chunk.level < level) {
      indexs.pop();
      const _children = getByIndex(pools, indexs);
      _children.push({
        id: chunk.id,
        name: chunk.text,
        level: chunk.level,
        children: [],
      });
    } else {
      children.push({
        id: chunk.id,
        name: chunk.text,
        level: chunk.level,
        children: [],
      });
    }
    
    level = chunk.level;
  }

  return pools;
}

function getByIndex(pools: IArticleHeaded[], indexs: number[]) {
  if (!indexs.length) return pools;
  let res = pools;
  for (let i = 0; i < indexs.length; i++) {
    res = res[indexs[i]].children;
  }
  return res;
}