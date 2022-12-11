export interface IAricleWithSummary {
  id: number;
  code: string;
  title: string;
  cover: string;
  ctime: string;
  readCount: number;
  mtime: string;
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
  id: number,
  code: string,
  title: string,
  ctime: string | Date,
  mtime: string | Date,
  original: boolean,
  readCount: number,
  md5: string,
  from: string,
  html: string,
  headings: IArticleHead[],
  category?: {
    id: number,
    name: string
  },
  tags: {
    id: number,
    name: string,
  }[],
  user: {
    id: number,
    account: string,
    nickname: string,
    avatar: string,
    level: number,
  },
  prev?: IArticleRelative,
  next?: IArticleRelative,
}

export interface IArticlesInput {
  keyword?: string,
  tag?: number,
  category?: number,
  page?: number,
}

export interface IArticles<T extends IAricleWithSummary = IAricleWithSummary> {
  dataSource: T[],
  total: number,
  tag: string,
  category: string,
}

export interface IArticleRelative {
  id: number,
  code: string,
  title: string,
  ctime: string | Date,
  reads: number,
}

export interface IArticleHot {
  id: number,
  code: string,
  title: string,
  summary: string,
  count: number,
}

export interface IArticleHeaded {
  id: string,
  name: string,
  level: number,
  children?: IArticleHeaded[],
}