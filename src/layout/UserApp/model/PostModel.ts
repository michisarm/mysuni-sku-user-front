import CommunityMenuType from '../../../community/model/CommunityMenuType';
import PostType from '../../../community/model/PostType';

type RelatedUrlList = {
  title: string;
  url: string;
};

export interface PostModel {
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
  profileImg?: string;

  creatorEmail?: string;
  creatorName?: string;
  creatorCompanyCode?: string;
  creatorCompanyName?: string;

  bookmarked: boolean;
  menuType: CommunityMenuType;

  prevPost: PostModel;
  nextPost: PostModel;

  relatedUrlList: RelatedUrlList[];
  depotId: string;
  content: string;
}

// Feed 추가
export interface CommunityProfileFeed {
  posts: PostItem[];
  postsTotalCount: number;
  postsOffset: number;
}

export function getEmtpyCommunityProfileFeed(): CommunityProfileFeed {
  return {
    posts: [],
    postsTotalCount: 0,
    postsOffset: 0,
  };
}

export interface PostItem {
  communityId: string;
  menuId: string;
  postId: string;
  communityName: string;
  profileImage: string;
  profileId: string;
  createdTime: string;
  name: string;
  contents: string;
  menuType: CommunityMenuType;
  bookmarked: boolean;
  likeCount: number;
  replyCount: number;
}
