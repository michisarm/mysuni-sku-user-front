import { Category } from './Category';

export interface CardCategory extends Category {
  mainCategory: boolean;
}

export const initialCardCategory = {
  collegeId: '',
  channelId: '',
  mainCategory: false,
}