import { findCommunityMenu } from 'community/api/CommunityMenuApi';
import {
  findMyMenus,
  findCommunityView,
  getCommunityGroups,
  saveCommunityAdminMenu,
  deleteCommunityAdminMenu,
} from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { setCommunityAdminMenu } from '../../store/CommunityAdminMenuStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';
import { CommunityAdminMenu } from 'community/viewModel/CommunityAdminMenu';

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
  });
}

export async function saveCommunityMenu(communityId: string, params: any) {
  for await (const param of params) {
    // await removeMenu(communityId, id);
    saveCommunityAdminMenu(communityId, param).then(result => {

    });
  }
}

export async function deleteCommunityMenu(communityId: string, params: any) {

  for await (const param of params) {
    // await removeMenu(communityId, id);
    deleteCommunityAdminMenu(communityId, param).then(result => {
    });
  }
}