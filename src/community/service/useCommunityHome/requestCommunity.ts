import { findAllMenus, findCommunity, findHome } from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';

export function requestCommunity(communityId: string) {
  findCommunity(communityId).then(community => {
    const communityHome = getCommunityHome() || {
      menus: [],
      recent: [],
      notice: [],
    };
    setCommunityHome({ ...communityHome, community });
  });
}

export function requestCommunityHome(communityId: string) {
  findHome(communityId).then(home => {
    const communityHome = getCommunityHome() || {
      menus: [],
      recent: [],
      notice: [],
    };
    setCommunityHome({ ...communityHome, home });
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
