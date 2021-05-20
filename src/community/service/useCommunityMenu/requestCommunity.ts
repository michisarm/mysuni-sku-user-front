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
  setCommunityMenuOrder,
} from '../../api/communityApi';
import {
  getCommunityHome,
  setCommunityHome,
} from '../../store/CommunityHomeStore';
import { setCommunityAdminMenu } from '../../store/CommunityAdminMenuStore';
import { getEmptyCommunityHome } from '../../viewModel/CommunityHome';
import { setCommunityAdminGroupsStore } from 'community/store/CommunityAdminGroupsStore';
import { CommunityDiscussion } from '../../model/CommunityDiscussion';

export function requestCommunityMenu(communityId: string) {
  const menuArr: any = [];
  return findCommunityMenu(communityId).then(community => {
    community.data.map((item: any, index: number) => {
      if (item.parentId === null) {
        menuArr.push(item);
      }
    });
    community.data.map((item: any) => {
      if (item.parentId !== '' && item.parentId !== null) {
        menuArr.map((item2: any, index: number) => {
          if (item.parentId === item2.id) {
            if (menuArr[index].child === undefined) {
              menuArr[index].child = [];
              menuArr[index].child.push(item);
            } else {
              menuArr[index].child.push(item);
            }
          }
        });
      }
    });

    menuArr.sort((a: any, b: any) => {
      if (a.order < b.order) {
        return -1;
      } else if (a.order > b.order) {
        return 1;
      } else {
        return 0;
      }
    });
    //여기서 트리구조 형태로 배열 만들어준다.
    setCommunityAdminMenu({ menu: menuArr });
    return menuArr;
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
    setCommunityAdminGroupsStore(result);
  });
}

export async function saveCommunityMenu(
  communityId: string,
  params: any,
  selectedRow: any,
  discussRow?: CommunityDiscussion
) {
  for await (const param of params) {
    if (discussRow) {
      let paramNameValues = param.nameValues;
      // 추후 정리 필요 DISCUSSION 이 여러개 수정된 경우 문제 발생으로 임시 조치
      if(param.id !== selectedRow.id && param.type === 'DISCUSSION'){
        if(param.type === 'DISCUSSION'){
          if(paramNameValues){
            paramNameValues = param.nameValues.filter(
              (data: any, index: any) => data.name === "order"
            );
            param.nameValues = paramNameValues;
          }
        }
      }
      if(paramNameValues){
        saveCommunityAdminMenu(communityId, param, selectedRow, discussRow);
      }
    } else {
      saveCommunityAdminMenu(communityId, param, selectedRow);
    }
  }
}

export async function saveCommunitydiscussionMenu(
  communityId: string,
  params: any,
  selectedRow: any
) {
  for await (const param of params) {
    saveCommunityAdminMenu(communityId, param, selectedRow).then(result => {});
  }
}

export async function deleteCommunityMenu(communityId: string, params: any) {
  for await (const param of params) {
    deleteCommunityAdminMenu(communityId, param).then(result => {});
  }
}

export function addCommunityMenu(communityId: string, addRow: any) {
  return addCommunityAdminMenu(communityId, addRow).then(result => {
    return result;
  });
}

export function addCommunityDiscussion(communityId: string, addRow: any) {
  return addCommunityAdminDiscussion(communityId, addRow).then(result => {
    return result;
  });
}

export function requestCommunitySurvey(params: any) {
  return findCommunitySurvey(params).then(result => {
    return result;
  });
}

export function getCommunitySurvey(surveyId: string) {
  return getCommunitySurveyInfo(surveyId).then(result => {
    return result;
  });
}

export function requestCommunityMenuOrder(communityId: string) {
  return setCommunityMenuOrder(communityId);
}
