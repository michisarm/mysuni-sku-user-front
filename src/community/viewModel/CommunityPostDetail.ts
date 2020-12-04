import Post from "community/model/Post";
import PostType from "community/model/PostType";

export interface CommunityPostDetail {
  id: string,
  postId: string,
  communityId: string,
  menuId: string,
  title: string,
  html: string,
  likeCount: number,
  replyCount: number,
  fileBoxId: string,
  commentFeedbackId: string,
  pinned: boolean,
  readCount: number,
  visible: boolean,
  creatorId: string,
  creatorName: string,
  createdTime: number,
  modifierId: string,
  modifiedTime: number,
  nickName: string,
  introduce: string,
  profileImg: string,
  prevPost?: Post,
  nextPost?: Post,
}

export interface CommunityPostItem {
  postId: string;
  communityId: string;
  menuId: string,
  title: string;
  html: string;
  readCount: number,
  replyCount: number;
  likeCount: number,
  commentFeedbackId: string;
  creatorId: string;
  creatorName: string;
  createdTime: number;
  nick: string;
}