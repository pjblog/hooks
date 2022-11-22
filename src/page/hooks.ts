import { useAsync } from "@codixjs/fetch";
import { useRequestConfigs } from "../request";
import { getHttpPage } from "./service";

export function usePage(id: string) {
  const configs = useRequestConfigs();
  return useAsync(getHttpPage.namespace(id), () => getHttpPage(id, configs), [id]);
}