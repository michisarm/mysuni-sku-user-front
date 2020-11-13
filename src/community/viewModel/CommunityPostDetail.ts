import PostType from "community/model/PostType";

export interface CommunityPostDetail {
  id: string,
  // patronKey: {
  //   keyString: r2y8-r@ne1-m2-c2,
  //   patronType: Audience,
  //   denizenKey: false,
  //   audienceKey: true,
  //   pavilionKey: false,
  //   cineroomKey: false
  // },
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
  readCount: string,
  visible: boolean,
  creatorId: string,
  createdTime: number,
  modifierId: string,
  modifiedTime: number,
  nickName: string,
  introduce: string,
  profileImg: string
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