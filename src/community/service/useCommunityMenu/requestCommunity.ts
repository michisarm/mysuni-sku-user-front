import { findCommunityMenu } from 'community/api/CommunityMenuApi';
import {
  findMyMenus,
  getCommunityGroups,
  saveCommunityAdminMenu,
  deleteCommunityAdminMenu,
  addCommunityAdminMenu,
  findCommunitySurvey,
  getCommunitySurveyInfo,
  addCommunityAdminDiscussion,
} from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { setCommunityAdminMenu } from '../../store/CommunityAdminMenuStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';
import { setCommunityAdminGroupsStore } from 'community/store/CommunityAdminGroupsStore';

export function requestCommunityMenu(communityId: string) {
  const menuArr: any = [];
  findCommunityMenu(communityId).then(community => {

    community.data.map((item: any, index: number) => {
      if (item.parentId === null) {
        menuArr.push(item)
      }
    })
    community.data.map((item: any) => {
      if (item.parentId !== '' && item.parentId !== null) {
        menuArr.map((item2: any, index: number) => {
          if(item.parentId === item2.id) {
            if(menuArr[index].child === undefined) {
              menuArr[index].child = []
              menuArr[index].child.push(item)
            }else {
              menuArr[index].child.push(item)
            }
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

    menuArr.map((item: any, index: number) => {
      if(item.child) {
        item.child.sort((a: any, b: any) => {
          if (a.order < b.order) {
            return -1;
          } else if (a.order > b.order) {
            return 1;
          } else {
            return 0;
          }
        })
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
    setCommunityAdminGroupsStore(result)
  });
}

export async function saveCommunityMenu(communityId: string, params: any) {
  for await (const param of params) {
    saveCommunityAdminMenu(communityId, param).then(result => {
    });
  }
}

export async function deleteCommunityMenu(communityId: string, params: any) {
  for await (const param of params) {
    deleteCommunityAdminMenu(communityId, param).then(result => {
    });
  }
}

export function addCommunityMenu(communityId: string, addRow: any) {
  return addCommunityAdminMenu(communityId, addRow).then(result => {
    return result
  });
}

export function addCommunityDiscussion(communityId: string, addRow: any) {
  return addCommunityAdminDiscussion(communityId, addRow).then(result => {
    return result
  });
}


export function requestCommunitySurvey(params: any) {
  return findCommunitySurvey(params).then(result => {
    return result
  });
}

export function getCommunitySurvey(surveyId: string) {
  return getCommunitySurveyInfo(surveyId).then(result => {
    return result
  });
}