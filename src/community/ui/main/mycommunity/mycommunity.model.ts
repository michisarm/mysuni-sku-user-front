import dayjs from 'dayjs';
import { CommunityView } from '../../data/community/models/CommunityView';
import { BookMarkCommunity } from '../../data/community/models/BookMarkCommunity';
import { PostType } from '../../data/community/models/PostType';
import { CommunityMenuType } from '../../data/community/models/CommunityMenuType';
import { Post } from '../../data/community/models/Post';
import { getCommunityProfileImage, getTimeString } from '../../app.formatters';
import DefaultImg from '../../assets/img-profile-80-px.png';
import { profileImgToImage } from '../../app/models/app.profile';

export interface MainMyCommunitiesItem {
  communityId: string;
  thumbnailId: string;
  name: string;
  managerName: string;
  managerEmail: string;
  memberCount: number;
  hasNewPost: boolean;
  type: string;
  isBookMarked: boolean;
}

export interface MainMyCommunitiesPostItem {
  communityId: string;
  menuId: string;
  postId: string;
  type: PostType;
  nickName?: string;
  communityName: string;
  profileImage: string;
  profileId: string;
  createdTime: string;
  name: string;
  contents: string;
  menuType: CommunityMenuType;
  bookmarked: boolean;
  likeCount: number;
  replyCount: number;
}

export type MainMyCommunitiesSort =
  | 'lastPostTime'
  | 'memberCreatedTime'
  | 'name';

export interface MainMyCommunityPost {
  postItems: MainMyCommunitiesPostItem[];
  postIndex: number;
  postTotalCount: number;
  isPostRequesting: boolean;
}

export type MyCommuntyTab = 'AllList' | 'FavoritesList' | 'ManageList';

export interface MainMyCommunityTab {
  selectedTab: MyCommuntyTab;
  AllCount: number;
  BookMarkCount: number;
  ManagedCount: number;
  sort: MainMyCommunitiesSort;
  items: MainMyCommunitiesItem[];
  hasItems: boolean;
}

export function getEmptyMainMyComunityPost(): MainMyCommunityPost {
  return {
    postItems: [],
    postIndex: 0,
    postTotalCount: 0,
    isPostRequesting: false,
  };
}

export function getEmptyMainMyCommunityTab(): MainMyCommunityTab {
  return {
    selectedTab: 'AllList',
    AllCount: 0,
    BookMarkCount: 0,
    ManagedCount: 0,
    sort: 'lastPostTime',
    items: [],
    hasItems: false,
  };
}

export function communityViewToMainMyCommunitiesItem(
  communityView: CommunityView | BookMarkCommunity
): MainMyCommunitiesItem {
  const {
    communityId,
    thumbnailId,
    name,
    managerName,
    managerNickName,
    nameFlag,
    managerEmail,
    memberCount,
    type,
    lastPostTime,
    bookmarked,
  } = communityView;

  return {
    communityId,
    type,
    thumbnailId,
    name,
    managerName: (nameFlag === 'R' ? managerName : managerNickName) || '',
    managerEmail,
    memberCount,
    hasNewPost: dayjs().startOf('day').valueOf() < (lastPostTime || 0),
    isBookMarked: bookmarked,
  };
}

export function postToMainMyCommunitiesPostItem(
  post: Post
): MainMyCommunitiesPostItem {
  const {
    communityId,
    menuId,
    postId,
    type,
    nickName,
    communityName,
    profileImg,
    createdTime,
    creatorName,
    html,
    title,
    menuType,
    bookmarked,
    likeCount,
    replyCount,
  } = post;

  return {
    communityId,
    menuId,
    postId,
    communityName,
    type,
    profileImage:
      type === 'ANONYMOUS'
        ? DefaultImg
        : profileImgToImage(getCommunityProfileImage(profileImg)),
    profileId: nickName || creatorName || '',
    createdTime: getTimeString(createdTime),
    name: title,
    contents: html,
    menuType,
    bookmarked,
    nickName,
    likeCount,
    replyCount,
  };
}
