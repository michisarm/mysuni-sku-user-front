import {
  findMyMenus,
  findCommunityView,
  findNoticePostViews,
} from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';
import { requestNotice, requestRecent } from './requestCommunityHome';

export function requestCommunity(communityId: string) {
  findCommunityView(communityId).then(async community => {
    await findNoticePostViews(communityId, 'createdTime', 0, 1, true).then(
      recentNotice => {
        // 공지사항메뉴에 New 표시를 위해 최근 공지 게시글 조회
        if (
          community !== undefined &&
          recentNotice !== undefined &&
          recentNotice.results.length > 0
        ) {
          community.lastNoticePostTime = recentNotice?.results[0].createdTime;
        }
      }
    );
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    setCommunityHome({ ...communityHome, community });
    setTimeout(async () => {
      await requestNotice(communityId);
      setTimeout(() => {
        requestRecent(communityId);
      }, 0);
    }, 0);
  });
}

export function requestCommunityMenus(communityId: string) {
  findMyMenus(communityId).then(menus => {
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    setCommunityHome({
      ...communityHome,
      menus: menus === undefined ? [] : menus,
    });
  });
}
