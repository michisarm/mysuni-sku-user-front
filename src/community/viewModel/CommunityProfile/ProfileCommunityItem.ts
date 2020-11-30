import CommunityType from "../../model/CommunityType";

export default interface ProfileCommunityItem {
  communityId: string;
  type: CommunityType;
  fieldName: string;
  name: string;
  managerName: string;
  memberCount: number;
  createdTime: string;
  isManager: boolean;
}