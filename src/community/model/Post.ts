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
  attachmentCount: number;
  visible: boolean;
  creatorId: string;
  createdTime: number;
  modifierId: string;
  modifiedTime: number;
}

export default interface PostArr {
  empty: boolean;
  results: Post[];
  totalCount: number;
}
