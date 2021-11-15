import { getCommunityProfileImage, getTimeString } from '../../app.formatters';
import { profileImgToImage } from '../../app/models/app.profile';
import { Post } from '../../data/community/models/Post';

export interface BookMark {
  bookmarkList: BookMarkItem[];
  totalcount: number;
  offset: number;
}

export interface BookMarkItem {
  bookmarked: boolean;
  postId: string;
  communityId: string;
  profileImg: string;
  communityName: string;
  profileId: string;
  createdTime: string;
  likeCount: number;
  replyCount: number;
  title: string;
  menuType: string;
  contents: string;
}

export function postToBookMarkItem(post: Post): BookMarkItem {
  const {
    bookmarked,
    communityId,
    postId,
    profileImg,
    communityName,
    createdTime,
    nickName,
    creatorName,
    likeCount,
    replyCount,
    title,
    menuType,
    html,
  } = post;

  return {
    bookmarked,
    communityId,
    postId,
    profileImg: profileImgToImage(getCommunityProfileImage(profileImg)),
    communityName,
    createdTime: getTimeString(createdTime),
    likeCount,
    profileId: nickName || creatorName || '',
    replyCount,
    title,
    menuType,
    contents: html,
  };
}
