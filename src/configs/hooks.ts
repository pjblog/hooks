import { createContext, useContext } from "react";
import { createDetaultConfigs } from "./service";

export const ConfigsContext = createContext(createDetaultConfigs());
export const ThemeConfigsContext = createContext(null);

export function useConfigs() {
  return useContext(ConfigsContext);
}

export function useThemeConfigs<T = any>() {
  return useContext<T>(ThemeConfigsContext);
}