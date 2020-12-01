import CommunityType from '../../model/CommunityType';

export default interface FollowCommunityItem {
  id: string;
  type: CommunityType;
  nickname: string;
  profileImg: string;
  followerCount: number;
  followingCount: number;
  email: string;
  name: string;
  createdTime: string;
  follow: boolean;
}
