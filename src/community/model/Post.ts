import PostType from "./PostType";

export default interface Post {
  postId: string;
  communityId: string;
  menuId: string;
  menuName: string;
  type: PostType;
  title: string;
  html: string;
  likeCount: number;
  replyCount: number;
  fileBoxId: number;
  commentFeebackId: string;
  pinned: boolean;
  readCount: number;
  visible: boolean;
  creatorId: string;
  createdTime: number;
  modifierId: string;
  modifiedTime: number;
}