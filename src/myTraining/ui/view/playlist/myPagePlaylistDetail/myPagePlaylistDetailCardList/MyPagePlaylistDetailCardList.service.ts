import { createStore } from 'shared/store/Store';

export interface CardCheckedItem {
  cardId: string;
  cardTitle: string;
  cardThumNail: string;
  checked?: boolean;
}

export const [
  setCheckedCardList,
  onCheckedCardList,
  getCheckedCardList,
  useCheckedCardList,
] = createStore<CardCheckedItem[]>();
