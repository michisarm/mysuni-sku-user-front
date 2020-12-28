import { findCommunityMenu } from 'community/api/CommunityMenuApi';
import {
  findMyMenus,
  findCommunityView,
  getCommunityGroups,
} from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { setCommunityAdminMenu } from '../../store/CommunityAdminMenuStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';
import { CommunityAdminMenu } from 'community/viewModel/CommunityAdminMenu';
import { setCommunityAdminGroupsStore } from 'community/store/CommunityAdminGroupsStore';

export function requestCommunityMenu(communityId: string) {
  const menuArr: any[] = [];
  findCommunityMenu(communityId).then(community => {
    community.data.map((item: any) => {
      if (item.parentId === null) {
        menuArr.push(item)
      }
    })

    community.data.map((item: any) => {
      if (item.parentId !== null) {
        menuArr.map((item2: any, index: number) => {
          if(item.parentId === item2.id) {
            menuArr[index].child = item
          }
        })
      }
    })

    menuArr.sort((a: any, b: any) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    })
    //여기서 트리구조 형태로 배열 만들어준다.
    setCommunityAdminMenu({'menu' : menuArr});
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

export function requestCommunityGroups(communityId: string) {
  getCommunityGroups(communityId).then(result => {
    console.log('result', result)
    setCommunityAdminGroupsStore(result)
    // const communityHome = getCommunityHome() || getEmptyCommunityHome();
    // setCommunityHome({
    //   ...communityHome,
    //   menus: menus === undefined ? [] : menus,
    // });
  });
}
