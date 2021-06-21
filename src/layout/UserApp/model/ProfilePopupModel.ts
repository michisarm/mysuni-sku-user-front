import { IdName } from '@nara.platform/accent';

export default interface ProfilePoupModel {
  name: string;
  company: IdName;
  profileImg: string;
  profileBgImg: string;
  nickname: string;
  oriNickname: string;
  nameFlag: string;
  introduce: string;
  hobby: string;
  followerCount: number;
  followingCount: number;
}
