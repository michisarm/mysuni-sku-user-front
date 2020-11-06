import { IdName } from "@nara.platform/accent";

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
  type: string;
  field: string;
  name: string;
  // 왕관
  creatorName: string;
  memberCount: number;
  createdTime: number;
}

export interface CommunityProfileMyCommunity {
  result: CommunityProfileMyCommunityItem[];
  totalCount: number;
}