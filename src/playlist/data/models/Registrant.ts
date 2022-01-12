import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export interface Registrant {
  backgroundImagePath: string;
  birthDate: string;
  companyCode: string;
  companyName: PolyglotString | null;
  departmentCode: string;
  departmentName: PolyglotString | null;
  displayNicknameFirst: true;
  duty: string;
  email: string;
  employeeId: string;
  gdiPhotoImagePath: string;
  gender: 'Male' | 'Female';
  id: string;
  language: 'Korean' | 'English' | 'Chinese';
  modifiedTime: number;
  modifier: string;
  name: PolyglotString | null;
  nickname: string;
  phone: string;
  photoImagePath: string;
  registeredTime: number;
  selfIntroduction: string;
  signedDate: number;
  useGdiPhoto: true;
  userGroupSequences: {
    sequences: number[];
  };
}
