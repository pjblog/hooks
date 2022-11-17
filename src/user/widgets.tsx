import React from "react";
import { MyInfoContext, ReloadMyInfoContext, useHttpMyInfo } from "./hooks";
import { ErrorTransformer } from '../error';

export function MyInfoProvider(props: React.PropsWithChildren<{
  error: React.FC<{ error: any }>,
  forbiden?: React.ReactNode | JSX.Element,
}>) {
  const { data, execute, error } = useHttpMyInfo();
  return <ErrorTransformer error={error} widget={props.error} forbiden={props.forbiden}>
    <MyInfoContext.Provider value={data}>
      <ReloadMyInfoContext.Provider value={execute}>
        {props.children}
      </ReloadMyInfoContext.Provider>
    </MyInfoContext.Provider>
  </ErrorTransformer>
}