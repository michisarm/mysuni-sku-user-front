import { PostType } from '../../data/community/models/PostType';
import { CommunityMenuType } from '../../data/community/models/CommunityMenuType';
import ProfileView from '../../data/community/models/ProfileView';
import { profileImgToImage } from '../../app/models/app.profile';
import {
  getCommunityProfileImage,
  getProfileImage,
  getTimeString,
} from '../../app.formatters';
import DefaultImg from '../../assets/img-profile-80-px.png';
import { Post } from '../../data/community/models/Post';
import { parsePolyglotString } from '../../../packages/polyglot/PolyglotString';

export interface MainFollowItem {
  id: string;
  profileNickName: string;
  profileImage: string;
  followerCount: number;
  followingCount: number;
}

export interface MainFollowPostItem {
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

export interface MainFollow {
  items: MainFollowItem[];
  filteredItems: MainFollowItem[];
  search: string;
}
export interface MainFollowPost {
  postItems: MainFollowPostItem[];
  postTotalCount: number;
  postIndex: number;
}

export function getEmptyMainFollow(): MainFollow {
  return {
    items: [],
    filteredItems: [],
    search: '',
  };
}
export function getEmptyMainFollowPost(): MainFollowPost {
  return {
    postItems: [],
    postTotalCount: 0,
    postIndex: 0,
  };
}
export function profileViewToMainFollowItem(
  profileView: ProfileView
): MainFollowItem {
  const { id, photoImagePath, gdiPhotoImagePath, useGdiPhoto, name, nickname } =
    profileView;

  return {
    id,
    profileImage: profileImgToImage(
      getProfileImage(photoImagePath, gdiPhotoImagePath, useGdiPhoto)
    ),
    profileNickName: nickname || parsePolyglotString(name),
    followerCount: 0,
    followingCount: 0,
  };
}

export function postToMainFollowPostItem(post: Post): MainFollowPostItem {
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
