import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface UserIdentity {
  backgroundImagePath: string;
  birthDate: string;
  companyCode: string;
  companyName: PolyglotString | null;
  departmentCode: string;
  departmentName: PolyglotString | null;
  displayNicknameFirst: boolean;
  email: string;
  employeeId: string;
  gdiPhotoImagePath: string;
  gender: 'Male' | 'Female';
  language: 'Korean' | 'English' | 'Chinese';
  id: string;
  name?: PolyglotString | null;
  nickname: string;
  phone: string;
  photoImagePath: string;
  selfIntroduction: string;
  registeredTime: number;
}

export function initUserIdentity(): UserIdentity {
  return {
    backgroundImagePath: '',
    birthDate: '',
    companyCode: '',
    companyName: {
      ko: '',
      en: '',
      zh: '',
    },
    departmentCode: '',
    departmentName: {
      ko: '',
      en: '',
      zh: '',
    },
    displayNicknameFirst: false,
    email: '',
    employeeId: '',
    gdiPhotoImagePath: '',
    gender: 'Male',
    language: 'Korean',
    id: '',
    name: {
      ko: '',
      en: '',
      zh: '',
    },
    nickname: '',
    phone: '',
    photoImagePath: '',
    selfIntroduction: '',
    registeredTime: 0,
  };
}
