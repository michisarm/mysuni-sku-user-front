import { createStore } from '../../../packages/store/createStore';
import { MyFeed } from './myfeed.models';

export const [useMyFeed, setMyFeed, getMyFeed, onMyFeed] =
  createStore<MyFeed>();

export function initMyFeed(): MyFeed {
  return {
    feedList: [],
    totalcount: 0,
    offset: 0,
  };
}
