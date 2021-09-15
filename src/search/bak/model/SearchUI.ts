import { createStore } from '../../../shared/store/Store';

export interface SearchUI {
  isLoading: boolean;
  transactionId: number;
}

export const [setSearchUI, onSearchUI, getSearchUI, useSearchUI] =
  createStore<SearchUI>();
