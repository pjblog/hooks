import { useGetAsync } from "../request";
import type { ICategory } from './types';

export function useCategories<T extends ICategory = ICategory>() {
  return useGetAsync<T[]>({
    id: 'categories',
    url: '/category',
  })
}