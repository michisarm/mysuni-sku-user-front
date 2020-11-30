import CommunityHomeType from '../../model/CommunityHomeType';

export default interface CommunityItem {
  communityId: string;
  thumbnailId: string;
  name: string;
  managerName: string;
  memberCount: number;
  hasNewPost: boolean;
}
