
import CommunityHomeType from '../../../community/model/CommunityHomeType';
import CommunityType from '../../../community/model/CommunityType';
import { CommunityMemberApprovedType, CommunityMemberType } from '../../../community/model/CommunityMember';

export interface CommunityModel {
  communityId: string;
  type: CommunityType;
  thumbnailId: string;
  name: string;
  description: string;
  createdTime: number;
  managerId: string;
  managerEmail: string;
  managerProfileImg: string;
  color: string;
  lastPostTime: number | null;
  lastNoticePostTime: number | null;
  courseId: string;
  homeType: CommunityHomeType | null;
  homeThumbnailId: string | null;
  introduce: string | null;
  html: string | null;
  managerName: string | null;
  memberCount: number;
  fieldName: string | null;
  profileImg: string;
  approved: CommunityMemberApprovedType;
  allowSelfJoin: number;
  memberType: CommunityMemberType;
  joinTime: number;
  signTime?: number;
  signModifyTime?: number;
}


export interface ProfileInfoCommunityItem {
  communityId: string;
  type: CommunityType;
  fieldName: string | null;
  name: string;
  managerName: string | null;
  memberCount: number;
  isManager: boolean;
  signInTime: string;
}

export interface ProfileInfoCommunities {
  communities: ProfileInfoCommunityItem[];
  communitiesTotalCount: number;
  communitiesOffset: number;
}

export function getEmtpyProfileInfoCommunityModel(): ProfileInfoCommunities {
  return {
    communities: [],
    communitiesTotalCount: 0,
    communitiesOffset: 0
  }
}