import { useSyncExternalStore } from 'react';
import { store } from './db';
import type { PersistState } from './db';

/** 订阅持久化状态，任何 mutation 后自动重渲染 */
export function useStore(): PersistState {
  return useSyncExternalStore(store.subscribe, store.getState, store.getState);
}
