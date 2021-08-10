import { createStore } from './Store';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface ProfileInfo {
  name: PolyglotString;
  nickname: string;
  followCount: number;
  followingCount: number;
  displayNicknameFirst: boolean;
  companyName: PolyglotString;
  selfIntroduction: string;
  photoImagePath: string;
  backgroundImagePath: string;
}

const [
  setProfileInfoModel,
  onProfileInfoModel,
  getProfileInfoModel,
  useProfileInfoModel,
] = createStore<ProfileInfo>();

export {
  setProfileInfoModel,
  onProfileInfoModel,
  getProfileInfoModel,
  useProfileInfoModel,
};

export function getEmptyProfileInfoStore() {
  return {
    id: '',
    name: { ko: '', en: '', zh: '' },
    companyName: { ko: '', en: '', zh: '' },
    photoImagePath: '',
    backgroundImagePath: '',
    gdiPhotoImagePath: '',
    useGdiPhoto: false,
    birthDate: '',
    companyCode: '',
    departmentCode: '',
    departmentName: { ko: '', en: '', zh: '' },
    displayNicknameFirst: false,
    email: '',
    employeeId: '',
    gender: '',
    language: 'Korean',
    modifiedTime: 0,
    registeredTime: 0,
    signedDate: 0,
    phone: '',
    modifier: '',
    nickname: '',
    selfIntroduction: '',
  };
}
