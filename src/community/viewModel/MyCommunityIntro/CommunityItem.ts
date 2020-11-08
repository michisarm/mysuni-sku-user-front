export default interface CommunityItem {
  communityId: string;
  image: string;
  name: string;
  hasNewPost: boolean;
  manager: string;
  memberCount: number;
}