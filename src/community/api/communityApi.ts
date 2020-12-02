import { axiosApi, OffsetElementList } from '@nara.platform/accent';
import Axios, { AxiosResponse } from 'axios';
import Post from 'community/model/Post';
import PostList from 'community/model/PostList';
import PostCdo from 'community/model/PostCdo';
import PostUdo from 'community/model/PostUdo';
import Community from '../model/Community';
import CommunityHomeInfo from '../model/CommunityHome';
import CommunityMenu from '../model/CommunityMenu';
import Profile from '../model/Profile';
import FieldItem from '../viewModel/OpenCommunityIntro/FieldItem';
import PostRdo from 'community/model/PostRdo';
import CommunityView from '../model/CommunityView';
import FollowCommunityItem from 'community/viewModel/CommunityFollowIntro/FollowCommunityItem';
import { NameValueList } from 'shared/model';
import FollowModal from '../viewModel/FollowModalIntro/CommunityFollowModalIntro';
import { patronInfo } from '@nara.platform/dock';
import FollowModalItem from 'community/viewModel/FollowModalIntro/FollowModalItem';

const BASE_URL = '/api/community';

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
  const url = `${BASE_URL}/postviews/menu/${postRdo.menuId}`
  return axiosApi.get<OffsetElementList<Post>>(url, { params }).then(AxiosReturn);
}

export function findAllPostViewsFromMyCommunities(
  sort: string,
  offset: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/my?sort=${sort}&offset=${offset}&limit=10`;
  return axiosApi.get<OffsetElementList<Post>>(url).then(AxiosReturn);
}

export function findNoticePostViews(
  communityId: string,
  sort: string,
  offset: number,
  limit: number
): Promise<OffsetElementList<Post> | undefined> {
  const url = `${BASE_URL}/postviews/notice/${communityId}?sort=${sort}&offset=${offset}&limit=${limit}`;
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

export function findAllMyCommunities(sort: string, offset: number): Promise<
  OffsetElementList<CommunityView> | undefined
> {
  const url = `${BASE_URL}/communities/communityView/my?sort=${sort}&offset=${offset}&limit=10`;
  return axiosApi.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findAllOtherCommunities(memberId: string, sort: string, offset: number): Promise<
  OffsetElementList<CommunityView> | undefined
> {
  const url = `${BASE_URL}/communities/communityView/other/${memberId}?sort=${sort}&offset=${offset}&limit=10`;
  return axiosApi.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findAllMyOpenCommunities(
  sort: string,
  offset: number
): Promise<OffsetElementList<CommunityView> | undefined> {
  const url = `${BASE_URL}/communities/communityView/open/my?sort=${sort}&offset=${offset}&limit=10`;
  return axiosApi.get<OffsetElementList<CommunityView>>(url).then(AxiosReturn);
}

export function findAllOpenCommunities(
  sort: string,
  offset: number,
  fieldId?: string
): Promise<OffsetElementList<CommunityView> | undefined> {
  const url = `${BASE_URL}/communities/communityView/open?${fieldId === undefined ? '' : `field=${fieldId}`
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
  const url = `${BASE_URL}/communities/${communityId}/members/join`;
  return axiosApi.post<void>(url).then(AxiosReturn);
}

export function findAllFields(): Promise<FieldItem[] | undefined> {
  const url = `${BASE_URL}/fields`;
  return axiosApi.get<FieldItem[]>(url).then(AxiosReturn);
}

export function findCommunity(
  communityId: string
): Promise<Community | undefined> {
  const url = `${BASE_URL}/communities/${communityId}`;
  return axiosApi.get<Community>(url).then(AxiosReturn);
}

export function findHome(
  communityId: string
): Promise<CommunityHomeInfo | undefined> {
  const url = `${BASE_URL}/${communityId}/home`;
  return axiosApi.get<CommunityHomeInfo>(url).then(AxiosReturn);
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

export function findPostByMenuIdAndType(menuId: string, type: string): Promise<Post> {
  const url = `${BASE_URL}/post/menu/${menuId}/type/${type}`;
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
  // console.log('axios offset', offset, limit);
  return axiosApi
    .get<OffsetElementList<Post>>(url)
    .then(response => response && response.data);
}
export function followList(
  offset: number,
  limit: number,
  nickName: string
): Promise<
  OffsetElementList<FollowCommunityItem> | undefined
> {
  const url = `${BASE_URL}/profileviews/following?offset=${offset}&limit=${limit}&nickName=${nickName}`;
  console.log('api name',axiosApi.get<OffsetElementList<FollowCommunityItem>>(url).then(AxiosReturn));
  return axiosApi.get<OffsetElementList<FollowCommunityItem>>(url).then(AxiosReturn);
}

// *******************************


// 모달 팔로워 **************************
export function followingsModal(): Promise<OffsetElementList<FollowModalItem> | undefined> {
  const url = `${BASE_URL}/profileviews/following?offset=0&limit=999`;
  console.log('팔로윙 api!!!!!',axiosApi.get(url).then(AxiosReturn) );
  return axiosApi.get<OffsetElementList<FollowModalItem>>(url).then(AxiosReturn);
}

export function followersModal(): Promise<OffsetElementList<FollowModalItem> | undefined> {
  const url = `${BASE_URL}/profileviews/follow?offset=0&limit=1000`;
<<<<<<< HEAD
=======
  console.log('api!!!', axiosApi.get(url).then(AxiosReturn));
>>>>>>> 23cc49339c7ad40f2ac48beeadd433ea63e86802
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

export function findPostMenuName(
  communityId: string,
  menuId: string
): Promise<any> {
  const url = `${BASE_URL}/${communityId}/menus/${menuId}`;
  return axiosApi.get(url).then(response => {
    return response && response.data
  });
}

export function registerBookmark(postId: string) {
  const url = `${BASE_URL}/bookmarks?postId=${postId}`
  return axiosApi.post<string>(url).then(AxiosReturn);
}

export function removeBookmark(postId: string) {
  const url = `${BASE_URL}/bookmarks/${postId}`
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
