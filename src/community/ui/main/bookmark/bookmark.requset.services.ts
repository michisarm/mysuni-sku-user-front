import { useEffect } from 'react';
import { removeBookmark } from '../../data/community/apis/bookmarksApi';
import { findAllPostViewsFromProfileBookmark } from '../../data/community/apis/postviewsApi';
import { postToBookMarkItem } from './bookmark.models';
import { getBookMark, initBookMark, setBookMark } from './bookmark.services';

export async function requestBookMark() {
  const bookmark = getBookMark() || initBookMark();
  const profileBookMark = await findAllPostViewsFromProfileBookmark(
    bookmark.offset,
    10,
  );

  if (profileBookMark !== undefined) {
    const nextBookMark = [
      ...bookmark.bookmarkList,
      ...profileBookMark.results.map(postToBookMarkItem),
    ];

    setBookMark({
      bookmarkList: nextBookMark,
      totalcount: profileBookMark.totalCount,
      offset: nextBookMark.length,
    });
  }
}

export function useRequestBookMark() {
  useEffect(() => {
    requestBookMark();

    return setBookMark;
  }, []);
}

export async function unbookmark(postId: string) {
  await removeBookmark(postId);

  const bookmark = getBookMark() || initBookMark();
  const profileBookMark = await findAllPostViewsFromProfileBookmark(
    0,
    bookmark.bookmarkList.length,
  );

  if (profileBookMark !== undefined) {
    const nextBookMark = [...profileBookMark.results.map(postToBookMarkItem)];
    setBookMark({
      bookmarkList: nextBookMark,
      totalcount: profileBookMark.totalCount,
      offset: nextBookMark.length,
    });
  }
}
