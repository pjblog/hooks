import { redirect, replace } from '@codixjs/codix';

export function createLinksLocation() {
  return {
    redirect: () => redirect('/link'),
    replace: () => replace('/link'),
  }
}