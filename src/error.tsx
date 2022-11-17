import React from "react";

export function ErrorTransformer(props: React.PropsWithChildren<{
  error: any,
  widget: React.FC<{ error: any }>,
  forbiden?: React.ReactNode | JSX.Element,
}>): JSX.Element {
  if (props.error && props.widget) {
    if (props.error?.code === 403) {
      return (props.forbiden || '您被禁止登录') as JSX.Element;
    }
    const Widget = props.widget;
    return <Widget error={props.error} />
  }
  return props.children as JSX.Element;
}