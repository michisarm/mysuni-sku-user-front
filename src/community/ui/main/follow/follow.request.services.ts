import {
  getMainFollow,
  setMainFollow,
  getMainFollowPost,
  setMainFollowPost,
} from './follow.services';
import {
  getEmptyMainFollow,
  profileViewToMainFollowItem,
  postToMainFollowPostItem,
  MainFollow,
  MainFollowItem,
  getEmptyMainFollowPost,
  MainFollowPost,
} from './follow.model';
import { findFollowPostViews } from '../../data/community/apis/postviewsApi';
import { useEffect } from 'react';
import {
  registerBookmark,
  removeBookmark,
} from '../../data/community/apis/bookmarksApi';
import {
  findFollowerUsers,
  findFollowCount,
} from '../../data/community/apis/followApi';
import { getDenizedId } from '../../app.formatters';

export async function requestMainFollowItems() {
  const memberId = getDenizedId();
  const followings = await findFollowerUsers(memberId);

  if (followings !== undefined) {
    const parseFollowerProfile = followings.results.map(
      profileViewToMainFollowItem
    );

    const nextFollowerProfile: MainFollowItem[] = [];

    parseFollowerProfile.forEach(async (item) => {
      const followCount = await findFollowCount(item.id);
      nextFollowerProfile.push({
        id: item.id,
        profileNickName: item.profileNickName,
        profileImage: item.profileImage,
        followerCount: followCount?.followerCount || 0,
        followingCount: followCount?.followingCount || 0,
      });
      const value = getMainFollow() || getEmptyMainFollow();
      setMainFollow({
        ...value,
        search: '',
        items: nextFollowerProfile,
        filteredItems: nextFollowerProfile,
      });
    });
  }
}

export async function requestMainFollowPostItems() {
  const { postItems, postIndex } =
    getMainFollowPost() || getEmptyMainFollowPost();
  const followPostViews = await findFollowPostViews(postIndex);
  if (followPostViews !== undefined) {
    const value = getMainFollowPost() || getEmptyMainFollowPost();
    const nextPostItems = [
      ...postItems,
      ...followPostViews.results.map(postToMainFollowPostItem),
    ];
    setMainFollowPost({
      ...value,
      postItems: nextPostItems,
      postIndex: nextPostItems.length,
      postTotalCount: followPostViews.totalCount,
    });
  }
}

export async function useRequestMainFollow() {
  useEffect(() => {
    requestMainFollowItems();

    setMainFollowPost(); //탭 재클릭시 초기화
    requestMainFollowPostItems();
    return setMainFollow;
  }, []);
}

export async function bookmark(postId: string) {
  const bookmarkId = await registerBookmark(postId);
  if (bookmarkId !== undefined) {
    const mainFollow = getMainFollowPost();
    if (mainFollow !== undefined) {
      const nextPostItem = mainFollow.postItems.map((postItem) => {
        if (postItem.postId === postId) {
          return { ...postItem, bookmarked: true };
        }
        return postItem;
      });
      const next: MainFollowPost = {
        ...mainFollow,
        postItems: nextPostItem,
      };
      setMainFollowPost(next);
    }
  }
}

export async function unbookmark(postId: string) {
  await removeBookmark(postId);
  const mainFollow = getMainFollowPost();
  if (mainFollow !== undefined) {
    const nextPostItem = mainFollow.postItems.map((postItem) => {
      if (postItem.postId === postId) {
        return { ...postItem, bookmarked: false };
      }
      return postItem;
    });
    const next: MainFollowPost = {
      ...mainFollow,
      postItems: nextPostItem,
    };
    setMainFollowPost(next);
  }
}
