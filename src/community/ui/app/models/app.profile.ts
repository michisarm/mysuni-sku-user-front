import DefaultImg from '../../assets/img-profile-80-px.png';
import Profile from '../../data/community/models/Profile';
import { includes } from 'lodash';
import { getProfileImage } from '../../app.formatters';
import { parsePolyglotString } from '../../../packages/polyglot/PolyglotString';

export interface AppProfile {
  id: string;
  profileImage: string;
  profileName: string;
  profileNickName: string;
  email: string;
  companyName: string;
  departmentName: string;
  displayNicknameFirst: boolean;
  selfIntroduction: string;
  backgroundImagePath: string;
  followerCount: number;
  followingCount: number;
}

export function profileImgToImage(profileImg: string) {
  let src = profileImg;
  if (profileImg === null || profileImg === '' || profileImg === undefined) {
    src = DefaultImg;
  } else if (
    includes(src, 'base64') ||
    includes(src, 'http') ||
    includes(src, '/files/') ||
    includes(src, '/static/') ||
    includes(src, '/suni-community/')
  ) {
    src = profileImg;
  } else if (profileImg.includes('/profile/photo/')) {
    src = `https://mysuni.sk.com${profileImg}`;
  } else {
    src = `/suni-asset${profileImg}`;
  }
  return src;
}

export function profileToAppProfile(profile: Profile): AppProfile {
  const {
    id,
    photoImagePath,
    gdiPhotoImagePath,
    useGdiPhoto,
    name,
    nickname,
    email,
    companyName,
    departmentName,
    displayNicknameFirst,
    selfIntroduction,
    backgroundImagePath,
  } = profile;

  return {
    id,
    profileImage: profileImgToImage(
      getProfileImage(photoImagePath, gdiPhotoImagePath, useGdiPhoto)
    ),
    profileName: parsePolyglotString(name),
    profileNickName: nickname,
    email,
    companyName: parsePolyglotString(companyName),
    departmentName: parsePolyglotString(departmentName),
    displayNicknameFirst,
    selfIntroduction,
    backgroundImagePath,
    followerCount: 0,
    followingCount: 0,
  };
}
