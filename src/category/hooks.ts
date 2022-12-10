import { useGetAsync } from "../request";
import type { ICategory } from './types';

export function useCategories() {
  return useGetAsync<ICategory[]>({
    id: 'categories',
    url: '/category',
  })
}