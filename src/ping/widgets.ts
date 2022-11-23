import { useAsyncCallback } from "@codixjs/fetch";
import { PropsWithChildren, useEffect } from "react";
import { getHttpPing } from "./service";

export function Ping(props: PropsWithChildren<{ timeout?: number }>) {
  const { execute } = useAsyncCallback(getHttpPing);
  useEffect(() => {
    const timer =setInterval(execute, props.timeout || 60000);
    return () => clearInterval(timer);
  }, [props.timeout]);
  return props.children as JSX.Element;
}