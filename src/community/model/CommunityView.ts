import CommunityHomeType from './CommunityHomeType';
import CommunityType from './CommunityType';
import { CommunityMemberApprovedType, CommunityMemberType } from './CommunityMember';

export default interface CommunityView {
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
}
