
export interface GroupList {
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
  name: string;
  teamId: string;
  teamName: string;
}

export interface GroupMemberList {
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
  modifiedTime: number
  modifierId: string;
  name: string;
  nickname: string;
  postCount: number;
  profileImg: string;
  replyCount: number;
  teamId: string;
  teamName: string;
}

export interface CommunityGroup {
  results: GroupList[];
  empty: boolean;
  totalCount: number;
  offset: number;
  limit: number;
}

export interface CommunityGroupMemberList {
  results: GroupMemberList[];
  empty: boolean;
  totalCount: number;
  offset: number;
  limit: number;
}