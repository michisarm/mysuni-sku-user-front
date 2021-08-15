import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import defaultProfileImg from 'style/../../public/images/all/img-profile-56-px.png';

export default interface ProfileInfoModel {
  id: string;
  name: PolyglotString;
  companyName: PolyglotString;
  useGdiPhoto: boolean;
  photoImagePath: string;
  backgroundImagePath: string;
  gdiPhotoImagePath: string;
  language: string;
  nickname: string;
  selfIntroduction: string;
  phone: string;
  gender: string;
  signedDate: number;
  registeredTime: number;
  modifiedTime: number;
  modifier: string;
  birthDate: string;
  companyCode: string;
  departmentCode: string;
  departmentName: PolyglotString;
  displayNicknameFirst: boolean;
  email: string;
  employeeId: string;
}

export function getPhotoImagePath(
  profileInfoModel: ProfileInfoModel | undefined
) {
  if (profileInfoModel === undefined) {
    return defaultProfileImg;
  }
  if (profileInfoModel.useGdiPhoto === true) {
    return `/profile/photo${profileInfoModel.gdiPhotoImagePath}`;
  }
  if (
    profileInfoModel.photoImagePath === undefined ||
    profileInfoModel.photoImagePath === null ||
    profileInfoModel.photoImagePath === ''
  ) {
    return defaultProfileImg;
  }
  return profileInfoModel.photoImagePath;
}
