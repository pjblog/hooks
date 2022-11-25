import React from "react";
import { ConfigsContext, useHttpConfigs, ThemeConfigsContext, useHttpThemeConfigs } from "./hooks";
import { ErrorTransformer } from '../error';

export function ConfigsProvider(props: React.PropsWithChildren<{
  error?: React.FC<{ error: any }>,
  forbiden?: React.ReactNode | JSX.Element,
  close?: React.ReactNode | JSX.Element,
}>) {
  const { data, error } = useHttpConfigs();
  if (data.close) {
    return (props.close || '网站关闭') as JSX.Element;
  }
  return <ErrorTransformer error={error} widget={props.error} forbiden={props.forbiden}>
    <ConfigsContext.Provider value={data}>
      {props.children}
    </ConfigsContext.Provider>
  </ErrorTransformer>
}

export function ThemeProvider(props: React.PropsWithChildren<{}>) {
  const { data } = useHttpThemeConfigs();
  return <ThemeConfigsContext.Provider value={data}>
    {props.children}
  </ThemeConfigsContext.Provider>
}