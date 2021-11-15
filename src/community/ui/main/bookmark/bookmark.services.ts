import { createStore } from '../../../packages/store/createStore';
import { BookMark } from './bookmark.models';

export const [useBookMark, setBookMark, getBookMark, onBookMark] =
  createStore<BookMark>();

export function initBookMark(): BookMark {
  return {
    bookmarkList: [],
    totalcount: 0,
    offset: 0,
  };
}
