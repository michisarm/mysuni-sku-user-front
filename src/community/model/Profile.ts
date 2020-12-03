import { IdName } from '@nara.platform/accent';

export default interface Profile {
  name: string;
  company: IdName;
  department: IdName;
  email: string;
  photo: {
    type: '0' | '1';
    filename: string;
    imageData: string;
  };
  nickname: string;
  introduce: string;
  hobby: string;
  profileImg: string;
  profileBgImg: string;
  followerCount: number;
  followingCount: number;

  isFollow?: boolean;
}
