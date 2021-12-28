import DefaultImg from '../assets/img-profile-80-px.png';
import { AppProfile, profileImgToImage } from '../app/models/app.profile';
import { getProfileImage } from '../app.formatters';
import { parsePolyglotString } from '../../packages/polyglot/PolyglotString';
import Profile from '../data/community/models/Profile';

interface ProfileModel extends AppProfile {
  id: string;
  profileImage: string;
  profileName: string;
  profileNickName: string;
  follow?: boolean;
}

export interface Main {
  profileImage: string;
  profileName: string;
  profileNickName: string;
  email: string;
  department: string;
  company: string;
  followerCount: number;
  followingCount: number;
  followers: ProfileModel[];
  followings: ProfileModel[];
  displayName: string;
}

export function getEmptyMain(): Main {
  return {
    profileImage: DefaultImg,
    profileName: '',
    profileNickName: '',
    email: '',
    company: '',
    department: '',
    followerCount: 0,
    followingCount: 0,
    followers: [],
    followings: [],
    displayName: '',
  };
}

export function profileViewToModel(profileView: Profile): ProfileModel {
  const {
    id,
    photoImagePath,
    gdiPhotoImagePath,
    useGdiPhoto,
    name,
    nickname,
    displayNicknameFirst,
    companyName,
    departmentName,
    email,
    selfIntroduction,
    backgroundImagePath,
  } = profileView;

  return {
    id,
    profileImage: profileImgToImage(
      getProfileImage(photoImagePath, gdiPhotoImagePath, useGdiPhoto)
    ),
    profileName: parsePolyglotString(name),
    profileNickName: nickname,
    displayNicknameFirst,
    companyName: parsePolyglotString(companyName),
    departmentName: parsePolyglotString(departmentName),
    email,
    followerCount: 0,
    followingCount: 0,
    selfIntroduction,
    backgroundImagePath,
    follow: true,
  };
}
