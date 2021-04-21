export interface CommunityDiscussionDetail {
  commentFeedbackId: string;
  communityId: string;
  discussionTopic?: string;
  content: string;
  createdTime: number;
  creatorId: string;
  fileBoxId: string;
  html: string;
  id: string;
  likeCount: number;
  menuId: string;
  modifierId: string;
  modifiedTime: number;
  patronKey: { keyString: string };
  pinned: boolean;
  postId: string;
  privateComment: boolean;
  readCount: number;
  relatedUrlList: Urls[];
  replyCount: number;
  title: string;
  type: string;
  visible: boolean;
}

interface Urls {
  title: string;
  url: string;
}
