import { IdName } from '@nara.platform/accent';

export default interface ProfileInfoModel {
  id: string;
  name: string;
  company: IdName;
  profileImg: string;
  profileBgImg: string;
  nickname: string;
  oriNickname: string;
  introduce: string;
  hobby: string;
  followerCount: number;
  followingCount: number;
  feedCount: number;
  badgeCount: number;
  communityCount: number;
  isFollow: boolean;
  isNickname: boolean;
}
