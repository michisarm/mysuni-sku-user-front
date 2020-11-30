import {
  findAllMenus,
  findCommunity,
  findCommunityView,
  findHome,
} from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';

export function requestCommunity(communityId: string) {
  findCommunityView(communityId).then(community => {
    const communityHome = getCommunityHome() || getEmptyCommunityHome();
    setCommunityHome({ ...communityHome, community });
  });
}

export function requestCommunityMenus(communityId: string) {
  findAllMenus(communityId).then(menus => {
    const communityHome = getCommunityHome() || {
      menus: [],
      recent: [],
      notice: [],
    };
    setCommunityHome({
      ...communityHome,
      menus: menus === undefined ? [] : menus,
    });
  });
}
