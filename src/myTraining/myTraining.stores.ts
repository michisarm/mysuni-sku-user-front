import { createStore } from 'shared/store/Store';

export const [setResultEmpty, onResultEmpty, getResultEmpty, useResultEmpty] =
  createStore<boolean>(true);
