export interface GroupDetail {
  communityId: string;
  companyId?: string;
  companyName?: string;
  createdTime: number;
  creatorId: string;
  email?: string;
  follow: boolean;
  groupId: string;
  groupName?: string;
  introduce: string;
  manager: false;
  managerId: string;
  managerNickName: string;
  memberCount: number;
  memberId?: string;
  modifiedTime: number;
  modifierId: string;
  name: string;
  nickname?: string;
  postCount?: number;
  profileImg?: string;
  replyCount?: number;
  teamId?: string;
  teamName?: string;
}
