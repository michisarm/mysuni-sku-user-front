import CommunityType from '../../model/CommunityType';

export default interface CommunityItem {
  type: CommunityType;
  communityId: string;
  image: string;
  name: string;
  hasNewPost: boolean;
  manager: string;
  memberCount: number;
  approved: boolean | null;
  fieldTitle: string;
  lastPostTime: number | null;
}
