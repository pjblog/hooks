export interface IAricleWithSummary {
  id: number;
  code: string;
  title: string;
  cover: string;
  ctime: string;
  readCount: number;
  mtime: string;
  comments: number;
  summary: string;
  user: {
    id: number,
    account: string,
    nickname: string,
    avatar: string,
    level: number
  },
  category: {
    id: number;
    name: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
}

export interface IArticleHead {
  id: string,
  level: number,
  text: string,
}

export interface IArticleWithHtml {
  id: number;
  title: string;
  ctime: Date;
  mtime: Date;
  readCount: number,
  commentable: boolean,
  user: {
    id: number,
    account: string,
    nickname: string,
    avatar: string,
    level: number
  },
  category: {
    name: string,
    id: number,
  };
  tags: {
      name: string;
      id: number;
  }[];
  html: string;
  headings: IArticleHead[];
  prev: IArticleRelative,
  next: IArticleRelative,
}

export interface IArticlesInput {
  keyword?: string,
  tag?: number,
  category?: number,
  page?: number,
}

export interface IArticles {
  list: IAricleWithSummary[],
  total: number,
  tag: string,
  category: string,
}

export interface IArticleRelative {
  id: number,
  code: string,
  title: string,
  summary: string,
  ctime: string | Date
}

export interface IArticleHot {
  id: number,
  code: string,
  title: string,
  summary: string,
  count: number,
}