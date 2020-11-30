
export interface MemberList {
  approved: boolean;
  communityId: string;
  companyId: string;
  companyName: string;
  createdTime: number;
  creatorId: string;
  email: string;
  follower: boolean;
  manager: boolean;
  memberId: string;
  modifiedTime: number;
  modifierId: string;
  name: string;
  nickname: string;
  postCount: number;
  profileImg: string;
  replyCount: number;
  teamId: string;
  teamName: string;
}

export interface MemberApproveList {
  communityId: string;
  companyId: string;
  companyName: string;
  createdTime: number;
  creatorId: string;
  groupId: string;
  introduce: string;
  manager: boolean
  managerId: string;
  managerNickName: string
  memberCount: number;
  modifiedTime: number;
  modifierId: string;
  memberId: string;
  name: string;
  teamId: string;
  teamName: string;
  profileImg:string
}

export interface CommunityMemberList {
  results: MemberList[];
  empty: boolean;
  totalCount: number;
  offset: 0;
  limit: 8;
}

export interface CommunityMemberApproveList {
  results: MemberApproveList[];
  empty: boolean;
  totalCount: number;
  offset: 0;
  limit: 8;
}