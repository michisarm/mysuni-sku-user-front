import CommunityType from '../../model/CommunityType';

export default interface FollowCommunityItem {
  type: CommunityType;
  nickName: string;
  profileImg: string;
  followerCount: number;
  followingCount: number;
  email: string;
  name: string;
  createdTime: string;

}
