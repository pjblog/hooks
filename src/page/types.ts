import { IArticleHead } from "../article";

export interface IPage {
  code: string,
  html: string,
  headings: IArticleHead[],
  ctime: string | Date,
  mtime: string | Date,
}