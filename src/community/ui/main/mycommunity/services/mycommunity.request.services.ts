import {
  getMainMyCommunityPost,
  getMainMyCommunityTab,
  setMainMyCommunityPost,
  setMainMyCommunityTab,
} from './mycommunity.services';
import {
  communityViewToMainMyCommunitiesItem,
  postToMainMyCommunitiesPostItem,
  getEmptyMainMyComunityPost,
  MainMyCommunityPost,
  getEmptyMainMyCommunityTab,
} from '../mycommunity.model';
import {
  findAllMyOpenCommunities,
  findBookMarkCommunity,
  findCommunityCount,
  findManagedCommunity,
} from '../../../data/community/apis/communityViewApi';
import { useEffect } from 'react';
import { findAllPostViewsFromMyCommunities } from '../../../data/community/apis/postviewsApi';
import {
  registerBookmark,
  removeBookmark,
} from '../../../data/community/apis/bookmarksApi';

export async function requestMainMyCommunityCount() {
  const communityCount = await findCommunityCount();
  const mainMyCommunityTab =
    getMainMyCommunityTab() || getEmptyMainMyCommunityTab();

  if (communityCount !== undefined) {
    setMainMyCommunityTab({
      ...mainMyCommunityTab,
      AllCount: communityCount.totalCount,
      BookMarkCount: communityCount.bookmarkCount,
      ManagedCount: communityCount.runningCount,
    });
  }
}

export async function requestMainMyCommunityItems() {
  const { sort } = getMainMyCommunityTab() || getEmptyMainMyCommunityTab();
  const itemList = await findAllMyOpenCommunities(sort);

  if (itemList !== undefined) {
    setMainMyCommunityTab({
      ...(getMainMyCommunityTab() || getEmptyMainMyCommunityTab()),
      selectedTab: 'AllList',
      items: itemList.results.map(communityViewToMainMyCommunitiesItem),
      hasItems: itemList.totalCount > 0,
    });
  }
}

export async function requestMainBookMarkCommunityItems() {
  const { sort } = getMainMyCommunityTab() || getEmptyMainMyCommunityTab();
  const itemList = await findBookMarkCommunity(9999, 0, sort);

  if (itemList !== undefined) {
    setMainMyCommunityTab({
      ...(getMainMyCommunityTab() || getEmptyMainMyCommunityTab()),
      selectedTab: 'FavoritesList',
      items: itemList.results.map(communityViewToMainMyCommunitiesItem),
      hasItems: itemList.totalCount > 0,
    });
  }
}

export async function requestMainManagedCommunityItems() {
  const { sort } = getMainMyCommunityTab() || getEmptyMainMyCommunityTab();
  const itemList = await findManagedCommunity(9999, 0, sort);

  if (itemList !== undefined) {
    setMainMyCommunityTab({
      ...(getMainMyCommunityTab() || getEmptyMainMyCommunityTab()),
      selectedTab: 'ManageList',
      items: itemList.results.map(communityViewToMainMyCommunitiesItem),
      hasItems: itemList.totalCount > 0,
    });
  }
}

export function useRequestMainMyCommunityItems() {
  useEffect(() => {
    requestMainMyCommunityItems();
    requestMainMyCommunityCount();
  }, []);
}

export async function requestMainMyCommunityPostItems() {
  const { postIndex } =
    getMainMyCommunityPost() || getEmptyMainMyComunityPost();

  const postItemList = await findAllPostViewsFromMyCommunities(
    'createdTime',
    postIndex
  );

  if (postItemList !== undefined) {
    const value = getMainMyCommunityPost() || getEmptyMainMyComunityPost();

    setMainMyCommunityPost({
      ...value,
      postItems: [
        ...value.postItems,
        ...postItemList.results.map(postToMainMyCommunitiesPostItem),
      ],
      postTotalCount: postItemList.totalCount,
      postIndex: postIndex + postItemList.results.length,
    });
  }
}

export function useRequestMainMyCommunityPostItems() {
  useEffect(() => {
    requestMainMyCommunityPostItems();

    return setMainMyCommunityPost;
  }, []);
}

export async function bookmark(postId: string) {
  const bookmarkId = await registerBookmark(postId);
  if (bookmarkId !== undefined) {
    const mainMyCommunityPost = getMainMyCommunityPost();
    if (mainMyCommunityPost !== undefined) {
      const nextPostItem = mainMyCommunityPost.postItems.map((postItem) => {
        if (postItem.postId === postId) {
          return { ...postItem, bookmarked: true };
        }
        return postItem;
      });
      const next: MainMyCommunityPost = {
        ...mainMyCommunityPost,
        postItems: nextPostItem,
      };
      setMainMyCommunityPost(next);
    }
  }
}

export async function unbookmark(postId: string) {
  await removeBookmark(postId);
  const mainMyCommunityPost = getMainMyCommunityPost();
  if (mainMyCommunityPost !== undefined) {
    const nextPostItem = mainMyCommunityPost.postItems.map((postItem) => {
      if (postItem.postId === postId) {
        return { ...postItem, bookmarked: false };
      }
      return postItem;
    });
    const next: MainMyCommunityPost = {
      ...mainMyCommunityPost,
      postItems: nextPostItem,
    };
    setMainMyCommunityPost(next);
  }
}

export async function communityBookMark() {
  //nodata
}

export async function communityUnBookMark() {
  //nodata
}
