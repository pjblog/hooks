import { createContext, useContext } from "react";
import { useAsync } from '@codixjs/fetch';
import { useRequestConfigs } from "../request";
import { createDetaultConfigs, getHttpConfigs, getHttpThemeConfigs } from "./service";

export const ConfigsContext = createContext(createDetaultConfigs());
export const ThemeConfigsContext = createContext(null);
export function useConfigs() {
  return useContext(ConfigsContext);
}

export function useHttpConfigs() {
  const configs = useRequestConfigs();
  return useAsync(getHttpConfigs.namespace, () => getHttpConfigs(configs));
}

export function useHttpThemeConfigs<T = any>() {
  const configs = useRequestConfigs();
  return useAsync<T>(getHttpThemeConfigs.namespace, () => getHttpThemeConfigs(configs));
}

export function useThemeConfigs<T = any>() {
  return useContext<T>(ThemeConfigsContext);
}