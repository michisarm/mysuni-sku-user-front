import { post } from 'jquery';
import { findNoticePostViews } from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';

export function requestNotice(communityId: string) {
  const offset = 0;
  const limit = 3;
  findNoticePostViews(communityId, 'createTime', offset, limit).then(posts => {
    const communityHome = getCommunityHome() || {
      menus: [],
      recent: [],
      notice: [],
    };
    if (posts === undefined) {
      setCommunityHome({ ...communityHome, notice: [] });
    } else {
      setCommunityHome({ ...communityHome, notice: posts.results });
    }
  });
}

export function requestRecent(communityId: string) {
  const offset = 0;
  const limit = 4;
  findNoticePostViews(communityId, 'createTime', offset, limit).then(posts => {
    const communityHome = getCommunityHome() || {
      menus: [],
      recent: [],
      notice: [],
    };
    if (posts === undefined) {
      setCommunityHome({ ...communityHome, recent: [] });
    } else {
      setCommunityHome({ ...communityHome, recent: posts.results });
    }
  });
}
