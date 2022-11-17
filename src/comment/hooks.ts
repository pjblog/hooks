import { useAsync, useAsyncCallback } from "@codixjs/fetch";
import { useCallback, useState } from "react";
import { useRequestConfigs } from "../request";
import { setHttpComment, getHttpComments } from './service';
import { IComment, ICommentList } from './types';

export function useComment(aid: number, pid: number) {
  const [text, setText] = useState<string>(null);
  const { execute, ...extras } = useAsyncCallback(setHttpComment);
  const submit = useCallback(
    () => execute(aid, pid, text), 
    [aid, pid, text, execute]
  );

  return {
    ...extras,
    text, setText,
    execute: submit,
  }
}

export function useCommentsByIndex(aid: number) {
  const configs = useRequestConfigs();
  const [index, setIndex] = useState(0);
  const obj = useAsync(
    getHttpComments.namespace(aid, index), 
    async (value?: ICommentList): Promise<ICommentList> => {
      const oldData = Array.isArray(value?.list) ? value.list.slice(0) : [];
      return await getHttpComments(aid, index, configs).then(({ list, total }) => {
        return {
          list: [...oldData, ...list],
          total,
        }
      })
    },
    [aid, index]
  )

  return {
    ...obj,
    index, setIndex,
  }
}