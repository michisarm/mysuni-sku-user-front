import CommunityMenuType from "./CommunityMenuType";
import PostType from "./PostType";

export default interface Post {
  id?: string;

  postId: string;
  communityId: string;
  menuId: string;

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

  createdTime: number;
  creatorId: string;

  communityName: string;

  nickName?: string;
  introduce?: string;
  profileImg?: string

  creatorEmail?: string
  creatorName?: string
  creatorCompanyCode?: string
  creatorCompanyName?: string

  bookmarked: boolean;
  menuType: CommunityMenuType;
}