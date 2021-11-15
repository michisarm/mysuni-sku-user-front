import { showAlert } from '../../packages/alert/Alert';
import {
  registerBookmark,
  removeBookmark,
} from '../data/community/apis/bookmarksApi';
import { setOpenHeaderUserProfileInfoProfileCardPopup } from './userProfileInfo.services';

export function copyUrl(e: any, communityId: string, postId: string) {
  e.preventDefault();
  e.stopPropagation();
  const textarea = document.createElement('textarea');
  textarea.value =
    window.location.protocol +
    '//' +
    window.location.host +
    `${process.env.PUBLIC_URL}/community/${communityId}/post/${postId}`;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999);
  document.execCommand('copy');
  document.body.removeChild(textarea);
  showAlert({ title: '알림', message: 'URL이 복사되었습니다.' });
}

export async function setbookmark(postId: string) {
  const bookmarkId = await registerBookmark(postId);

  return bookmarkId;
  /*if (bookmarkId !== undefined) {
    const followCommunityIntro = getFollowCommunityIntro();
    if (followCommunityIntro === undefined) {
      return;
    }
    setFollowCommunityIntro({
      ...followCommunityIntro,
      posts: followCommunityIntro.posts.map(c => {
        if (c.postId !== postId) {
          return c;
        }
        return { ...c, bookmarked: true };
      }),
    });
    setBookmarked(true);
    setBookmarkClass('');
  }*/
}

export async function unbookmark(postId: string) {
  await removeBookmark(postId);
  /*const followCommunityIntro = getFollowCommunityIntro();
    if (followCommunityIntro === undefined) {
      return;
    }
    setFollowCommunityIntro({
      ...followCommunityIntro,
      posts: followCommunityIntro.posts.map(c => {
        if (c.postId !== postId) {
          return c;
        }
        return { ...c, bookmarked: false };
      }),
    });*/
}

export function onOpenHeaderUserProfileInfoProfileCardPopup() {
  setOpenHeaderUserProfileInfoProfileCardPopup(true);
}

export function onCloseHeaderUserProfileInfoProfileCardPopup() {
  setOpenHeaderUserProfileInfoProfileCardPopup(false);
}
