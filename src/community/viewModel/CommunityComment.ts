
export interface CommunityComment {
  comment: CommunityCommentItem[];
  ascending: boolean;
}

export interface CommunityCommentItem {
  childComment: CommunityCommentChildItem[];
  message: string;
  time: string;
  name: string;
  id: string;
  childItemCount: number;
}

export interface CommunityCommentChildItem {
  message: string;
  time: string;
  name: string;
  id: string;
}