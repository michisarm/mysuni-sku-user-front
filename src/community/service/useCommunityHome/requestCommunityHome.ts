import { post } from 'jquery';
import { findAllPostViews, findNoticePostViews,  findPreview } from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';

export function requestNotice(communityId: string) {
  const offset = 0;
  const limit = 3;
  findNoticePostViews(communityId, 'createdTime', offset, limit).then(posts => {
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
  findAllPostViews(communityId, 'createdTime', offset, limit).then(posts => {
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    if (posts === undefined) {
      setCommunityHome({ ...communityHome, recent: [], recentRequested: true, });
    } else {
      setCommunityHome({ ...communityHome, recent: posts.results, recentRequested: true, });
    }
  });
}

export function findPreViewHome(communityId: string,draft: number) {
  findPreview(communityId,1).then(CommunityHome =>{
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    if(CommunityHome !== undefined){
      setCommunityHome({ ...communityHome, recent: [], recentRequested: true, });
    }
  });
}