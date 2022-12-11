import { IConfigs } from './types';

export function createDetaultConfigs(): IConfigs {
  return {
    close: false,
    description: null,
    name: null,
    theme: 'pjblog-theme-default',
    article_size: 10,
    keywords: null,
    copyright: null,
    icp: null,
    domain: null,
    favicon: null,
    articles: 0,
    reads: 0,
    notice: null,
  }
}