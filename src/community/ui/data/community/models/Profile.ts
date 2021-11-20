import { PatronKey } from '@nara.drama/depot';
import { PolyglotString } from '../../../../packages/polyglot/PolyglotString';

export default interface Profile {
  id: string;
  email: string;
  name: PolyglotString;
  nickname: string;
  gender: string;
  entityVersion: number;
  patronKey: PatronKey;
  modifiedTime: number;
  modifier: string;
  registeredTime: number;
  // memberLocale: MemberLocaleModel;
  // pisAgreement: PisAgreementModel;
  signedDate: string;
  birthDate: string;
  photoImagePath: string; //mySUNI 로부터 사용자가 등록한 증명사진 이미지 주소
  gdiPhotoImagePath: string; // gdi를 통해 업데이트한 이미지 주소값
  useGdiPhoto: boolean;
  backgroundImagePath: string; // 배경이미지 주소
  selfIntroduction: string; // 자기소개
  displayNicknameFirst: boolean; // 닉네임/실명 여부 값(false: 실명, true: 닉네임)
  departmentName: PolyglotString;
  departmentCode: string;
  phone: string;
  employeeId: string;
  companyName: PolyglotString;
  companyCode: string;
  language: string;
  userGroupSequences: {
    sequences: number;
  };
}
