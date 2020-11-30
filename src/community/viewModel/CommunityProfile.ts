import { IdName } from '@nara.platform/accent';
import CommunityType from '../model/CommunityType';
import ProfileCommunityItem from './CommunityProfile/ProfileCommunityItem';
import PostItem from './CommunityProfileFeed/PostItem';

interface Item {
  activated?: boolean;
  editing?: boolean;
}

export interface CommunityProfileItem extends Item {
  name: string;
  company: IdName;
  profileImg: string;
  profileBgImg: string;
  nickname: string;
  introduce: string;
  hobby: string;
}

export interface CommunityProfile {
  name: string;
  company: IdName;
  profileImg: string;
  profileBgImg: string;
  nickname: string;
  introduce: string;
  hobby: string;
}

export interface CommunityProfileMyCommunityItem {
  type: CommunityType;
  name: string;
  managerId: string;
  createdTime: number;
  fieldName: string;
  managerName: string;
  memberCount: number;
}

export interface CommunityProfileMyCommunity {
  communities: ProfileCommunityItem[];
  communitiesTotalCount: number;
  communitiesOffset: number;
}

export function getEmtpyCommunityProfileMyCommunity(): CommunityProfileMyCommunity {
  return {
    communities: [],
    communitiesTotalCount: 0,
    communitiesOffset: 0
  }
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
    postsOffset: 0
  }
}

// Bookmark 추가
export interface CommunityProfileBookmark {
  posts: PostItem[];
  postsTotalCount: number;
  postsOffset: number;
}

export function getEmtpyCommunityProfileBookmark(): CommunityProfileBookmark {
  return {
    posts: [],
    postsTotalCount: 0,
    postsOffset: 0
  }
}
