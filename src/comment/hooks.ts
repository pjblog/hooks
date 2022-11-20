import { useAsync, useAsyncCallback } from "@codixjs/fetch";
import { useCallback, useState } from "react";
import { useRequestConfigs } from "../request";
import { setHttpComment, getHttpComments } from './service';

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

export function useComments(aid: number, page: number = 1) {
  const configs = useRequestConfigs();
  return useAsync(
    getHttpComments.namespace(aid, page), 
    () => getHttpComments(aid, page, configs),
    [aid, page]
  )
}