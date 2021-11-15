import { useEffect } from 'react';
import {
  registerBookmark,
  removeBookmark,
} from '../../data/community/apis/bookmarksApi';
import { findAllPostViewsFromProfileFeed } from '../../data/community/apis/postviewsApi';
import { MyFeed, postToMyFeedPostItme } from './myfeed.models';
import { setMyFeed, getMyFeed, initMyFeed } from './myfeed.services';

export async function requestMyFeed() {
  const myFeed = getMyFeed() || initMyFeed();
  const profileFeed = await findAllPostViewsFromProfileFeed(
    '',
    myFeed.offset,
    10,
  );

  if (profileFeed !== undefined) {
    const nextMyFeedItem = [
      ...myFeed.feedList,
      ...profileFeed.results.map(postToMyFeedPostItme),
    ];

    setMyFeed({
      feedList: nextMyFeedItem,
      totalcount: profileFeed.totalCount,
      offset: nextMyFeedItem.length,
    });
  }
}

export function useRequestMyFeed() {
  useEffect(() => {
    requestMyFeed();

    return setMyFeed;
  }, []);
}

export async function bookmark(postId: string) {
  const bookmarkId = await registerBookmark(postId);
  if (bookmarkId !== undefined) {
    const myFeed = getMyFeed();
    if (myFeed !== undefined) {
      const nextPostItem = myFeed.feedList.map(feed => {
        if (feed.postId === postId) {
          return { ...feed, bookmarked: true };
        }
        return feed;
      });
      const next: MyFeed = {
        ...myFeed,
        feedList: nextPostItem,
      };
      setMyFeed(next);
    }
  }
}

export async function unbookmark(postId: string) {
  await removeBookmark(postId);
  const myFeed = getMyFeed();
  if (myFeed !== undefined) {
    const nextPostItem = myFeed.feedList.map(feed => {
      if (feed.postId === postId) {
        return { ...feed, bookmarked: false };
      }
      return feed;
    });
    const next: MyFeed = {
      ...myFeed,
      feedList: nextPostItem,
    };
    setMyFeed(next);
  }
}
