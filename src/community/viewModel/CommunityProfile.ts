import { IdName } from '@nara.platform/accent';
import CommunityType from '../model/CommunityType';

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
  result: CommunityProfileMyCommunityItem[];
  totalCount: number;
}
