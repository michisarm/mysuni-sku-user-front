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
  title: string;
  html: string;
  replyCount: number;
  commentFeedbackId: string;
  creatorId: string;
  createdTime: number;
  nick: string;
}