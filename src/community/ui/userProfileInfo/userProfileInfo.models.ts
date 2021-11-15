import File from '../data/depot/models/File';

export interface ProfileInfo {
  name: string;
  nickName: string;
  selfIntroduction: string;
  followerCount: number;
  followingCount: number;
  profileImage: string;
  backGrounImage: string;
  communityCount: number;
  feedCount: number;
  companyName: string;
}

export interface CommunityPostDetail {
  communityId: string;
  menuId: string;
  postId: string;
  title: string;
  profileImg?: string;
  nickName?: string;
  createdTime: string;
  readCount: number;
  likeCount: number;
  replyCount: number;
  html: string;
  files?: File[];
  commentFeedbackId: string;
  menuType: string;
  creatorId: string;
  bookmarked: boolean;
  menuName: string;
  type: string;
}

export interface CommunityPostMyLikeComment {
  postId: string;
  likeYn: boolean;
  commentYn: boolean;
}
