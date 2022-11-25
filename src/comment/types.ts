export interface IComment {
  id: number,
  html: string,
  ip: string,
  ctime: string | Date,
  rid: number,
  content?: string,
  user: {
    id: number,
    nickname: string,
    account: string,
    avatar: string,
    level: number,
  },
  article: {
    id: number,
    title: string,
    code: string,
  },
  replies?: IComment[],
}

export interface ICommentList { 
  list: IComment[], 
  total: number 
}