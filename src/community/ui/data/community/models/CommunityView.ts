import { CommunityHomeType } from './CommunityHomeTown';
import { CommunityType } from './CommunityType';
import { CommunityMemberType } from './CommunityMember';
import { CommunityMemberApprovedType } from './CommunityMemberApprovedType';

export interface CommunityView {
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
  lastPostTime?: number;
  lastNoticePostTime?: number;
  courseId: string;
  bookmarked: boolean;

  homeType?: CommunityHomeType;
  homeThumbnailId?: string;
  introduce?: string;
  html?: string;

  managerName?: string;
  managerNickName?: string;

  nameFlag: 'R' | 'N';

  memberCount: number;

  fieldName?: string;
  profileImg: string;
  approved: CommunityMemberApprovedType;
  allowSelfJoin: number;

  memberType: CommunityMemberType;

  homeTemplateId: string;
  introTemplateId: string;

  signModifyTime: number;
  signTime: number;
  signInTime: string;
}
