import CommunityHomeType from '../../model/CommunityHomeType';

export default interface CommunityItem {
  communityId: string;
  thumbnailId: string;
  name: string;
  managerName: string;
  managerNickName: string;
  managerEmail: string;
  memberCount: number;
  hasNewPost: boolean;
  type: string;
}
