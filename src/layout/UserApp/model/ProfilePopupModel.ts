import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export default interface ProfilePoupModel {
  id: string;
  name: PolyglotString;
  company: PolyglotString;
  profileImg: string;
  profileBgImg: string;
  nickname: string;
  displayNicknameFirst: boolean;
  selfIntroduce: string;
  followerCount: number;
  followingCount: number;
}
