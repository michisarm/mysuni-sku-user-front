import { CommunityMemberApprovedType } from './CommunityMemberApprovedType';
import { MemberType } from './Member';

export interface MemberSearchBox {
  communityId?: string;
  approved?: CommunityMemberApprovedType;
  startDate: Date | number;
  endDate: Date | number;
  offset?: number;
  limit?: number;
  companyName?: string;
  name?: string;
  teamName?: string;
  email?: string;
  nickname?: string;
  memberType?: MemberType | '';
  follow?: boolean;
  postCount?: number;
  replyCount?: number;
  createdTime?: number;
  profileImg?: string;
}
