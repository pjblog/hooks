import { Suspense } from "react";
import { ConfigsProvider } from '../configs';
import { MyInfoProvider } from '../user';
import { Ping } from '../ping';

export function BlogProvider(props: React.PropsWithChildren<{ 
  fallback?: React.ReactNode, // loading
  error?: React.FC<{ error: any }>, // error boundary
  forbiden?: React.ReactNode | JSX.Element, // user forbiden
  close?: React.ReactNode | JSX.Element, // website closed
}>) {
  return <Ping>
    <Suspense fallback={props.fallback}>
      <ConfigsProvider error={props.error} forbiden={props.forbiden} close={props.close}>
        <Suspense fallback={props.fallback}>
          <MyInfoProvider error={props.error} forbiden={props.forbiden}>
            {props.children}
          </MyInfoProvider>
        </Suspense>
      </ConfigsProvider>
    </Suspense>
  </Ping>
}