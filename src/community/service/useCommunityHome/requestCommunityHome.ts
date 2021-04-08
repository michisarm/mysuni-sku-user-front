import { post } from 'jquery';
import { findAllPostViews, findNoticePostViews, findPreview, findHome, findHomeRecentPostViews } from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';
import { getCommunityHomeCreateItem, setCommunityHomeCreateItem } from 'community/store/CommunityHomeCreateStore';

export function requestNotice(communityId: string) {
  const offset = 0;
  const limit = 3;
  const orderNotContainPinned = true;
  findNoticePostViews(communityId, 'createdTime', offset, limit, orderNotContainPinned).then(posts => {
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    if (posts === undefined) {
      setCommunityHome({ ...communityHome, notice: [], noticeRequested: true, });
    } else {
      setCommunityHome({ ...communityHome, notice: posts.results, noticeRequested: true, });
    }
  });
}

export function requestRecent(communityId: string) {
  const offset = 0;
  const limit = 4;
  const orderNotContainPinned = true;
  findHomeRecentPostViews(communityId, 'createdTime', offset, limit, orderNotContainPinned).then(posts => {
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    if (posts === undefined) {
      setCommunityHome({ ...communityHome, recent: [], recentRequested: true, });
    } else {
      setCommunityHome({ ...communityHome, recent: posts.results, recentRequested: true, });
    }
  });
}

export function findPreViewHome(communityId: string, draft: number) {
  findPreview(communityId, 1).then(preview => {
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    setCommunityHome({ ...communityHome, preview });
  });
}

export function findHomeContents(communityId: string) {
  findHome(communityId).then(communityHome => {
    setCommunityHomeCreateItem(communityHome);
  });
}