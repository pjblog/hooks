import { createContext, useContext } from "react";
import { useAsync } from '@codixjs/fetch';
import { useRequestConfigs } from "../request";
import { createDetaultConfigs, getHttpConfigs } from "./service";


export const ConfigsContext = createContext(createDetaultConfigs());
export function useConfigs() {
  return useContext(ConfigsContext);
}

export function useHttpConfigs() {
  const configs = useRequestConfigs();
  return useAsync(getHttpConfigs.namespace, () => getHttpConfigs(configs));
}