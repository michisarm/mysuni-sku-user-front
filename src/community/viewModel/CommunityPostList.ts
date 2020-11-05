export interface CommunityPostList {
  items: CommunityPostItem[];
  totalCount: number;
  empty: boolean;
  offset: number;
  limit: number;
  orderType?: string;
  searchType?: string;
  searchText?: string;
}

export interface CommunityPostItem {
  id: string;
  boardId: string;
  readCount: number;
  title: string;
  contents: string;
  writer: string;
  time: number;
  count: number;
  commentFeedbackId?: string;
  delete: boolean;
}