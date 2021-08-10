import { PolyglotString } from 'shared/viewmodel/PolyglotString';

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
