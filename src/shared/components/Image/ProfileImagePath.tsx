import { srcParser } from './Image';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

/* 중복 코드 주석 처리 */
function ProfileImagePath(src: string | PolyglotString) {
  // if (src === null || src === undefined || src === '') {
  //   return null;
  // }

  // if (
  //   includes(src, 'base64') ||
  //   includes(src, 'http') ||
  //   includes(src, '/files/') ||
  //   includes(src, '/static/')
  // ) {
  //   return src;
  // }

  // const next = src.startsWith('/') ? src.substring(1) : src;

  // if (includes(src, '/profile/photo/')) {
  //   // https://mysuni.sk.com, 멤버 사원 이미지
  //   return `${process.env.REACT_APP_SK_IM_ROOT_URL}/${next}`;

  // } else if (includes(src, '/profile/') && !src.startsWith('suni-asset')) {
  //   // 사용자가 업로드한 프로필 이미지
  //   return `/suni-asset/${next}`;

  // }

  // // 예전 커뮤니티 프로필 이미지
  // return `/files/community/${next}`;
  return srcParser(src);
}

export default ProfileImagePath;
