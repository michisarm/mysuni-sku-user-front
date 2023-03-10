import PostType from "community/model/PostType";

export interface CommunityPostList {
  items: CommunityPostItem[];
  totalCount: number;
  empty: boolean;
  offset: number;
  limit: number;
  sortType?: string;
  searchType?: string;
  searchText?: string;
}

export interface CommunityPostItem {
  postId: string;
  communityId: string;
  communityName: string;
  title: string;
  html: string;
  replyCount: number;
  commentFeedbackId: string;
  menuId: string;
  createdTime: number;
  creatorId: string;
  nickName: string;
  pinned: boolean;
  fileBoxId: string;
  newBadge: boolean;
  menuType?: string;
  creatorName: string;
  visible: boolean;
  readCount: number;
  likeCount: number;
}