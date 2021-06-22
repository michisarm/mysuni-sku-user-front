import { CommunityDiscussion } from '../model/CommunityDiscussion';
import { axiosApi, OffsetElementList, NameValue } from '@nara.platform/accent';
import Axios, { AxiosResponse } from 'axios';
import Post from 'community/model/Post';
import PostCdo from 'community/model/PostCdo';
import Community from '../model/Community';
import CommunityHomeInfo from '../model/CommunityHome';
import CommunityMenu from '../model/CommunityMenu';
import Profile from '../model/Profile';
import FieldItem from '../viewModel/OpenCommunityIntro/FieldItem';
import CommunityView from '../model/CommunityView';
import FollowCommunityItem from 'community/viewModel/CommunityFollowIntro/FollowCommunityItem';
import { NameValueList } from 'shared/model';
import FollowModalItem from 'community/viewModel/FollowModalIntro/FollowModalItem';
import { CommunityHomeCreateItem } from 'community/viewModel/CommunityHomeCreate';

const BASE_URL = '/api/community';
const FEEDBACK_URL = '/api/feedback';

function AxiosReturn<T>(response: AxiosResponse<T>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    response.data === null ||
    (response.data as unknown) === ''
  ) {
    return undefined;
  }
  return response.data;
}

export function registerCommunityCommentPost(title: string): Promise<string> {
  const url = `/api/feedback/feedback/comment`;
  return axiosApi
    .post<string>(url, {
      title,
      audienceKey: '',
      sourceEntity: { id: 'post', name: 'post' },
    })
    .then(response => response && response.data);
}

export function registerPost(
  communityId: string,
  postCdo: PostCdo
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/flow`;
  return axiosApi
    .post<Post>(url, postCdo)
    .then(response => response && response.data);
}

export function registerNoticePost(
  communityId: string,
  postCdo: PostCdo
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/flow/noticePosts`;
  return axiosApi
    .post<Post>(url, postCdo)
    .then(response => response && response.data);
}

export function registerAnonymousePost(
  communityId: string,
  postCdo: PostCdo
): Promise<Post> {
  postCdo.type = 'ANONYMOUS';
  const url = `${BASE_URL}/communities/${communityId}/posts/flow/anonymous`;
  return axiosApi
    .post<Post>(url, postCdo)
    .then(response => response && response.data);
}

export function findPostViewsByMenuId(
  postRdo: any
): Promise<OffsetElementList<Post> | undefined> {
  const params = {
    communityId: postRdo.communityId,
    offset: postRdo.offset,
    limit: postRdo.limit,
    menuId: postRdo.menuId,
    searchGubun: postRdo.searchGubun,
    sort: postRdo.sort,
    searchTitle: postRdo.searchTitle,
  };
  const url = `${BASE_URL}/postviews/menu/${postRdo.menuId}`;
  return axiosApi
    .get<OffsetElementList<Post>>(url, { params })
    .then(AxiosReturn);
}

export function findAllPostViewsFromMyCommunities(
  sort: string,
  offset: number
): Promise<OffsetElementList<Post> | undefined> {
  const initLimit = 10;
  const url = `${BASE_URL}/postviews/my?sort=${sort}&offset=0&limit=${offset +
    initLimit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findNoticePostViews(
  communityId: string,
  sort: string,
  offset: number,
  limit: number,
  orderNotContainPinned?: boolean
): Promise<OffsetElementList<Post> | undefined> {
  let url = `${BASE_URL}/postviews/notice/${communityId}?sort=${sort}&offset=${offset}&limit=${limit}`;
  if (orderNotContainPinned !== undefined) {
    url += `&orderNotContainPinned=${orderNotContainPinned}`;
  }
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findHomeRecentPostViews(
  communityId: string,
  sort: string,
  offset: number,
  limit: number,
  orderNotContainPinned?: boolean
): Promise<OffsetElementList<Post> | undefined> {
  let url = `${BASE_URL}/postviews/home/recent?communityId=${communityId}&sort=${sort}&offset=${offset}&limit=${limit}`;
  if (orderNotContainPinned !== undefined) {
    url += `&orderNotContainPinned=${orderNotContainPinned}`;
  }
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findAllPostViews(
  communityId: string,
  sort: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/community/${communityId}?sort=${sort}&offset=${offset}&limit=${limit}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findPostView(postId: string): Promise<Post> {
  const url = `${BASE_URL}/postviews/post/${postId}`;
  return axiosApi.get<Post>(url).then(response => response && response.data);
}

export function findPostViewWithRead(postId: string): Promise<Post> {
  const url = `${BASE_URL}/postviews/postWithIncreaseReadCount/${postId}`;
  return axiosApi.get<Post>(url).then(response => response && response.data);
}

//커뮤니티 - 전체글
export function findAllPost(
  postRdo: any
): Promise<OffsetElementList<Post> | undefined> {
  const params = {
    communityId: postRdo.communityId,
    offset: postRdo.offset,
    limit: postRdo.limit,
    menuId: postRdo.menuId,
    searchGubun: postRdo.searchGubun,
    sort: postRdo.sort,
    searchTitle: postRdo.searchTitle,
  };
  const url = `${BASE_URL}/postviews/community/${postRdo.communityId}`;
  return axiosApi
    .get<OffsetElementList<Post>>(url, { params })
    .then(response => response && response.data);
}

//커뮤니티 - 공지사항
export function findNoticePost(
  postRdo: any
): Promise<OffsetElementList<Post> | undefined> {
  const params = {
    communityId: postRdo.communityId,
    offset: postRdo.offset,
    limit: postRdo.limit,
    menuId: postRdo.menuId,
    searchGubun: postRdo.searchGubun,
    sort: postRdo.sort,
    searchTitle: postRdo.searchTitle,
  };
  const url = `${BASE_URL}/postviews/notice/${postRdo.communityId}`;
  return axiosApi
    .get<OffsetElementList<Post>>(url, { params })
    .then(response => response && response.data);
}

export function modifyCommunityPost(
  communityId: string,
  postId: string,
  nameValues: NameValueList
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}/nameValues`;
  return axiosApi
    .put<Post>(url, nameValues)
    .then(response => response && response.data);
}

export function findProfile(): Promise<Profile | undefined> {
  const url = `${BASE_URL}/profiles`;
  return axiosApi.get<Profile>(url).then(AxiosReturn);
}

export function findAllMyCommunities(
  sort: string,
  offset: number
): Promise<OffsetElementList<CommunityView> | undefined> {
  const url = `${BASE_URL}/communities/communityView/my?sort=${sort}&offset=${offset}&limit=10`;
  return axiosApi.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findAllOtherCommunities(
  memberId: string,
  sort: string,
  offset: number
): Promise<OffsetElementList<CommunityView> | undefined> {
  const url = `${BASE_URL}/communities/communityView/other/${memberId}?sort=${sort}&offset=${offset}&limit=10`;
  return axiosApi.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findAllMyOpenCommunities(
  sort: string,
  offset: number
): Promise<OffsetElementList<CommunityView> | undefined> {
  const url = `${BASE_URL}/communities/communityView/open/my?sort=${sort}`;
  return axiosApi.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findAllOpenCommunities(
  sort: string,
  offset: number,
  fieldId?: string
): Promise<OffsetElementList<CommunityView> | undefined> {
  if (offset > 12) {
    const url = `${BASE_URL}/communities/communityView/open?${
      fieldId === undefined ? '' : `field=${fieldId}`
    }&sort=${sort}&offset=0&limit=${offset}`;
    return axiosApi
      .get<OffsetElementList<CommunityView>>(url)
      .then(AxiosReturn);
  }
  const url = `${BASE_URL}/communities/communityView/open?${
    fieldId === undefined ? '' : `field=${fieldId}`
  }&sort=${sort}&offset=${offset}&limit=12`;
  return axiosApi.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findCommunityView(
  communityId: string
): Promise<CommunityView | undefined> {
  const url = `${BASE_URL}/communities/communityView/${communityId}`;
  return axiosApi.get<CommunityView>(url).then(AxiosReturn);
}

export function joinCommunity(communityId: string): Promise<void> {
  const url = `${BASE_URL}/communities/${communityId}/members/flow/join`;
  return axiosApi.post<void>(url).then(AxiosReturn);
}

export function findAllFields(): Promise<FieldItem[] | undefined> {
  const url = `${BASE_URL}/fields`;
  return axiosApi.get<FieldItem[]>(url).then(AxiosReturn);
}

export function findCommunity(
  communityId: string
): Promise<Community | undefined> {
  const url = `${BASE_URL}/communities/communityView/detail/${communityId}`;
  return axiosApi.get<Community>(url).then(AxiosReturn);
}

export function findCommunityByCourseId(
  communityId: string
): Promise<Community | undefined> {
  const url = `${BASE_URL}/communities/byCourseId/${communityId}`;
  return axiosApi.get<Community>(url).then(AxiosReturn);
}

//community 관리자 Home 조회 - draft 값 없을시 draft 1 조회가 됨 차후 수정 필요
export function findHome(
  communityId: string
): Promise<CommunityHomeCreateItem | undefined> {
  const url = `${BASE_URL}/${communityId}/home/0`;
  return axiosApi.get<CommunityHomeCreateItem>(url).then(AxiosReturn);
}

// 미리보기
export function findPreview(
  communityId: string,
  draft: number
): Promise<CommunityHomeInfo | undefined> {
  const url = `${BASE_URL}/${communityId}/home/${draft}`;
  return axiosApi.get<CommunityHomeInfo>(url).then(AxiosReturn);
}

export function findAllMenus(
  communityId: string
): Promise<CommunityMenu[] | undefined> {
  const url = `${BASE_URL}/${communityId}/menus`;
  return axiosApi.get<CommunityMenu[]>(url).then(AxiosReturn);
}

export function findMyMenus(
  communityId: string
): Promise<CommunityMenu[] | undefined> {
  const url = `${BASE_URL}/${communityId}/menus/my`;
  return axiosApi.get<CommunityMenu[]>(url).then(AxiosReturn);
}

export function findPostByMenuId(menuId: string): Promise<Post> {
  const url = `${BASE_URL}/post/menu/${menuId}`;
  return axiosApi.get<Post>(url).then(response => response && response.data);
}

export function findPostByMenuIdAndType(
  menuId: string,
  type: string
): Promise<Post> {
  const url = `${BASE_URL}/postviews/post/menu/${menuId}/type/${type}`;
  return axiosApi.get<Post>(url).then(response => response && response.data);
}

export function deleteCommunityPost(
  communityId: string,
  postId: string
): Promise<Post> {
  const url = `${BASE_URL}/communities/${communityId}/posts/${postId}`;
  return axiosApi.delete(url).then(response => response && response.data);
}
// follow main **********************************************************
export function followPostList(
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/followers?offset=${offset}&limit=${limit}`;
  return axiosApi
    .get<OffsetElementList<Post>>(url)
    .then(response => response && response.data);
}
export function followList(
  offset: number,
  limit: number,
  nickName: string
): Promise<OffsetElementList<FollowCommunityItem> | undefined> {
  const url = `/api/profile/profiles/following?nickName=${nickName}`;
  return axiosApi
    .get<OffsetElementList<FollowCommunityItem>>(url)
    .then(AxiosReturn);
}

// *******************************

// 모달 팔로워 **************************
export function followingsModal(): Promise<
  OffsetElementList<FollowModalItem> | undefined
> {
  // const url = `${BASE_URL}/profileviews/following`;
  const url = `/api/profile/profiles/following`;
  return axiosApi
    .get<OffsetElementList<FollowModalItem>>(url)
    .then(AxiosReturn);
}

export function followersModal(): Promise<
  OffsetElementList<FollowModalItem> | undefined
> {
  // const url = `${BASE_URL}/profileviews/follow?offset=0&limit=1000`;
  const url = `/api/profile/profiles/follow?limit=100&offset=0`;
  return axiosApi.get(url).then(AxiosReturn);
}

export function followModalAdd(id: string): Promise<any> {
  const url = `${BASE_URL}/follow/flow/${id}`;
  return axiosApi.post(url).then(AxiosReturn);
}
export function followModalDelete(id: string): Promise<FollowCommunityItem> {
  const url = `${BASE_URL}/follow/flow/${id}/unfollow`;
  return axiosApi.delete(url).then(AxiosReturn);
}

// *****************************************

export function findMenu(
  communityId: string,
  menuId: string
): Promise<CommunityMenu> {
  const url = `${BASE_URL}/${communityId}/menus/${menuId}`;
  return axiosApi.get(url).then(response => {
    return response && response.data;
  });
}

export function registerBookmark(postId: string) {
  const url = `${BASE_URL}/bookmarks?postId=${postId}`;
  return axiosApi.post<string>(url).then(AxiosReturn);
}

export function removeBookmark(postId: string) {
  const url = `${BASE_URL}/bookmarks/${postId}`;
  return axiosApi.delete(url).then(AxiosReturn);
}

// profile - feed
export function findAllPostViewsFromProfileFeed(
  memberId: string,
  offset: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/feed?offset=${offset}&limit=10&memberId=${memberId}`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

// profile - bookmark
export function findAllPostViewsFromProfileBookmark(
  offset: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/bookmarks?offset=${offset}&limit=10`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

//커뮤니티 - 그룹장리스트
export function findNoticePostGroupManager(communityId: string): Promise<any> {
  const url = `${BASE_URL}/groupviews/groupList?communityId=${communityId}`;
  return axiosApi.get(url).then(response => {
    return response && response.data;
  });
}

//커뮤니티 - 그룹리스트
export function getCommunityGroups(communityId: string): Promise<any> {
  const url = `${BASE_URL}/communities/${communityId}/groups`;
  return axiosApi.get(url).then(response => {
    return response && response.data;
  });
}

export function saveCommunityAdminMenu(
  communityId: string,
  params: any,
  selectedRow: any,
  discussRow?: CommunityDiscussion
): Promise<any> {
  if (
    params.id === selectedRow.id &&
    (selectedRow.type === 'DISCUSSION' || selectedRow.type === 'ANODISCUSSION') &&
    (params.type === 'DISCUSSION' || params.type === 'ANODISCUSSION')
  ) {
    const discussMenuParams = {
      ...discussRow,
      discussionTopic: selectedRow.discussionTopic,
      id: selectedRow.id,
      name: selectedRow.name,
      title: selectedRow.title,
      content: selectedRow.content,
      type: selectedRow.type,
      groupId: selectedRow.groupId === null ? '' : selectedRow.groupId,
      accessType: selectedRow.accessType,
      order: selectedRow.order,
    };

    const url = `${BASE_URL}/${communityId}/menus/flow/${selectedRow.id}`;
    return axiosApi.put(url, discussMenuParams).then(response => {
      return response && response.data;
    });
  }else{
    const url = `${BASE_URL}/${communityId}/menus/${params.id}`;
    return axiosApi.put(url, { nameValues: params.nameValues }).then(response => {
      return response && response.data;
    });
  }
}

export function deleteCommunityAdminMenu(
  communityId: string,
  params: any
): Promise<any> {
  // params: CommunityAdminMenu
  const url = `${BASE_URL}/${communityId}/menus/${params}`;
  return axiosApi.delete(url).then(response => {
    return response && response.data;
  });
}

export function addCommunityAdminMenu(
  communityId: string,
  addRow: any
): Promise<any> {
  // params: CommunityAdminMenu
  const url = `${BASE_URL}/${communityId}/menus`;
  return axiosApi.post(url, addRow).then(response => {
    return response && response.data;
  });
}

export function addCommunityAdminDiscussion(
  communityId: string,
  addRow: any
): Promise<any> {
  const url = `${BASE_URL}/${communityId}/menus/flow/discussion`;

  const params = {
    ...addRow,
    groupId: addRow.groupId === null ? '' : addRow.groupId,
  };

  return axiosApi.post(url, params).then(response => {
    return response && response.data;
  });
}

export function findCommunitySurvey(params: any): Promise<any> {
  const url = `/api/survey/surveyForms/searchKey?`;
  return axiosApi.get(url, { params }).then(response => {
    return response;
  });
}

export function findPostMenuDiscussion(menuId: string): Promise<any> {
  return axiosApi
    .get<any>(`${BASE_URL}/post/menu/${menuId}`)
    .then(response => response && response.data && response.data);
}

export function findMenuDiscussionFeedBack(
  commentFeedbackId: string
): Promise<any> {
  return axiosApi
    .get(`${FEEDBACK_URL}/feedback/${commentFeedbackId}/comment`)
    .then(response => response && response.data && response.data);
}

export function getCommunitySurveyInfo(surveyId: string): Promise<any> {
  const url = `/api/survey/surveyForms/${surveyId}`;
  return axiosApi.get(url).then(response => {
    return response;
  });
}

export function setCommunityMenuOrder(communityId: string): Promise<any> {
  const url = `/api/community/${communityId}/menus/order`;
  return axiosApi.put(url).then(response => {
    return response;
  });
}

export function deleteMember(
  communityId: string,
  memberId: string
): Promise<string> {
  return axiosApi
    .put(`${BASE_URL}/communities/${communityId}/members/flow/draw/${memberId}`)
    .then(response => response && 'success');
}
export function rejectMember(
  communityId: string,
  memberId: string
): Promise<string> {
  return axiosApi
    .put(
      `${BASE_URL}/communities/${communityId}/members/flow/reject/${memberId}`
    )
    .then(response => response && 'success');
}
