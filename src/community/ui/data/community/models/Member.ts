import { CommunityMemberApprovedType } from './CommunityMemberApprovedType';

export interface Member {
  approved: CommunityMemberApprovedType;
  communityId: string;
  companyCode: string;
  companyId: string | null;
  companyName: string;
  createdTime: number;
  creatorId: string;
  email: string;
  follow: boolean;
  manager: boolean;
  memberId: string;
  memberType: MemberType;
  modifiedTime: number | null;
  modifierId: string | null;
  name: string;
  nickname: string;
  postCount: number;
  profileImg: string;
  remark: string | null;
  replyCount: number;
  teamId: string;
  teamName: string;
  useGdIPhoto: false;
}

export type MemberType = '' | 'ADMIN' | 'MEMBER';
