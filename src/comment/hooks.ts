import { useAsync, useAsyncCallback } from "@codixjs/fetch";
import { useCallback, useState } from "react";
import { useRequestConfigs } from "../request";
import { setHttpComment, getHttpComments, delHttpComment, getHttpCommentPreview, getHttpCommentLatest } from './service';

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

export function useCommentDeletion() {
  return useAsyncCallback(delHttpComment);
}

export function useCommentPreview() {
  return useAsyncCallback(getHttpCommentPreview);
}

export function useCommentsLatest(size: number) {
  const configs = useRequestConfigs();
  return useAsync(
    getHttpCommentLatest.namespace(size), 
    () => getHttpCommentLatest(size, configs), 
    [size]
  );
}