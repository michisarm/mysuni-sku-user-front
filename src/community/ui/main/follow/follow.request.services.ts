import { getMainFollow, setMainFollow } from './follow.services';
import {
  getEmptyMainFollow,
  profileViewToMainFollowItem,
  postToMainFollowPostItem,
  MainFollow,
  MainFollowItem,
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
    const value = getMainFollow() || getEmptyMainFollow();

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
    });

    setMainFollow({
      ...value,
      search: '',
      items: nextFollowerProfile,
      filteredItems: nextFollowerProfile,
    });
  }
}

export async function requestMainFollowPostItems() {
  const { postItems, postIndex } = getMainFollow() || getEmptyMainFollow();
  const followPostViews = await findFollowPostViews(postIndex);
  if (followPostViews !== undefined) {
    const value = getMainFollow() || getEmptyMainFollow();
    const nextPostItems = [
      ...postItems,
      ...followPostViews.results.map(postToMainFollowPostItem),
    ];
    setMainFollow({
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
    requestMainFollowPostItems();

    return setMainFollow;
  }, []);
}

export async function bookmark(postId: string) {
  const bookmarkId = await registerBookmark(postId);
  if (bookmarkId !== undefined) {
    const mainFollow = getMainFollow();
    if (mainFollow !== undefined) {
      const nextPostItem = mainFollow.postItems.map((postItem) => {
        if (postItem.postId === postId) {
          return { ...postItem, bookmarked: true };
        }
        return postItem;
      });
      const next: MainFollow = {
        ...mainFollow,
        postItems: nextPostItem,
      };
      setMainFollow(next);
    }
  }
}

export async function unbookmark(postId: string) {
  await removeBookmark(postId);
  const mainFollow = getMainFollow();
  if (mainFollow !== undefined) {
    const nextPostItem = mainFollow.postItems.map((postItem) => {
      if (postItem.postId === postId) {
        return { ...postItem, bookmarked: false };
      }
      return postItem;
    });
    const next: MainFollow = {
      ...mainFollow,
      postItems: nextPostItem,
    };
    setMainFollow(next);
  }
}
