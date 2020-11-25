export default interface MemberRdo {
  searchFilter: string;
  name: string;
  startDate: number;
  endDate: number;
  limit: number;
  offset: number;

  communityId: string;
  approved: boolean;

  companyName: string;
  teamName: string;
  nickName: string;
  email: string;
  groupId: string;
}
