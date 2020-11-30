import CommunityHomeType from './CommunityHomeType';
import CommunityType from './CommunityType';

export default interface CommunityView {
  communityId: string;
  type: CommunityType;
  thumbnailId: string;
  name: string;
  description: string;
  createdTime: number;
  managerId: string;
  lastPostTime: number | null;

  homeType: CommunityHomeType | null;
  homeThumbnailId: string | null;
  introduce: string | null;
  html: string | null;

  managerName: string | null;

  memberCount: number;

  fieldName: string | null;

  approved: boolean | null;
}
