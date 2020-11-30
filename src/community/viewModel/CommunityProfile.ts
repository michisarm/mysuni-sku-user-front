import { IdName } from '@nara.platform/accent';
import CommunityType from '../model/CommunityType';
import ProfileCommunityItem from './CommunityProfile/ProfileCommunityItem';

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
