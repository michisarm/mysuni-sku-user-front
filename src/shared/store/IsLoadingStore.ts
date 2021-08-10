import { createStore } from './Store';

export const [setIsLoading, onIsLoading, getIsLoading, useIsLoading] =
  createStore<boolean>(false);
