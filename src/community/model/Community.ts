import CommunityType from './CommunityType';

export default interface Community {
  communityId: string;
  type: CommunityType;
  field: string;
  fieldName: string;
  thumbnailId: string;
  name: string;
  description: string;
  managerId: string;
  managerName: string;
  managerEmail: string;
  managerCompany: string;
  visible: string;
  memberCount: number;
  approved: boolean | null;
  lastPostTime: number | null;
}
