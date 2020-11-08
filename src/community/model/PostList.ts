import PostType from "./PostType";

interface Post {
  postId: string;
  communityId: string;
  menuId: string;
  menuName: string;
  type: PostType;
  title: string;
  html: string;
  likeCount: number;
  replyCount: number;
  fileBoxId: string;
  commentFeedbackId: string;
  pinned: boolean;
  readCount: number;
  visible: boolean;
  creatorId: string;
  createdTime: number;
  modifierId: string;
  modifiedTime: number;
}

export default interface PostList {
  empty: boolean;
  results: Post[];
  totalCount: number;
}