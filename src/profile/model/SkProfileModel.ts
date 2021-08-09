import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { computed, decorate, observable } from 'mobx';
import { NameValueList } from 'shared/model';
import MemberType from './MemberType';
import MemberLocaleModel from './MemberLocaleModel';
import EmployeeModel from './EmployeeModel';
import PisAgreementModel from './PisAgreementModel';
import ProfileImagePath from '../../../src/shared/components/Image/ProfileImagePath';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';

class SkProfileModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  // member: EmployeeModel = new EmployeeModel();
  // memberType: MemberType = MemberType.SkMember;
  memberLocale: MemberLocaleModel = new MemberLocaleModel();
  pisAgreement: PisAgreementModel = new PisAgreementModel();
  signedDate: string = '';
  // passwordAuthenticated: boolean = false;
  // studySummaryConfigured: boolean = false;

  // photoType: string = '0'; //0 - IM(타 시스템의 사용자 증명사진), 1 - mySUNI에서 등록한 사용자 증명사진인 경우
  photoImagePath: string = ''; //mySUNI 로부터 사용자가 등록한 증명사진 이미지 주소
  gdiPhotoImagePath: string = ''; // gdi를 통해 업데이트한 이미지 주소값
  useGdiPhoto: boolean = false;
  backgroundImagePath: string = ''; // 배경이미지 주소

  nickName: string = ''; // 닉네임
  // introduce: string = ''; // 자기소개
  selfIntroduction: string = ''; // 자기소개
  // followerCount: number = 0; // 팔로워 숫자
  // followingCount: number = 0; // 팔로잉 숫자
  // nameFlag: string = 'R'; // 닉네임/실명 여부 플래그(R: 실명 ,  N: 닉네임)
  displayNicknameFirst: boolean = false; // 닉네임/실명 여부 값(false: 실명, true: 닉네임)
  departmentName: PolyglotString = { ko: '', en: '', zh: '' };
  departmentCode: string = '';
  email: string = '';
  name: PolyglotString = { ko: '', en: '', zh: '' };
  phone: string = '';
  employeeId: string = '';
  companyName: PolyglotString = { ko: '', en: '', zh: '' };
  companyCode: string = '';
  // language: Language = null;
  language: string = '';

  constructor(skProfile?: SkProfileModel) {
    //
    if (skProfile) {
      const patronKey = skProfile.patronKey || this.patronKey;
      // const member =
      //   (skProfile.member && new EmployeeModel(skProfile.member)) ||
      //   this.member;
      const pisAgreement =
        (skProfile.pisAgreement &&
          new PisAgreementModel(skProfile.pisAgreement)) ||
        this.pisAgreement;
      Object.assign(this, { ...skProfile, patronKey, pisAgreement });
    }
  }

  // @computed
  // get departmentCode() {
  //   //
  //   return (this.member && this.member.departmentCode) || '';
  // }

  static asNameValues(skProfile: SkProfileModel): NameValueList {
    const asNameValues1 = {
      nameValues: [
        // {
        //   name: 'member',
        //   value: JSON.stringify(skProfile.member),
        // },
        // {
        //   name: 'memberType',
        //   value: skProfile.memberType,
        // },
        {
          name: 'pisAgreement',
          value: JSON.stringify(skProfile.pisAgreement),
        },
        {
          name: 'locale',
          value: JSON.stringify(skProfile.memberLocale),
        },
        // {
        //   name: 'passwordAuthenticated',
        //   value: skProfile.passwordAuthenticated ? 'true' : 'false',
        // },
      ],
    };

    return asNameValues1;
  }

  @computed
  get getSignedDate() {
    if (this.signedDate && this.signedDate !== '') {
      return new Date(this.signedDate).toISOString().slice(0, 10);
    }
    return '';
  }

  @computed
  get photoFilePath() {
    //
    let photoImageFilePath: string = '';

    if (this.photoImagePath && this.photoImagePath !== '') {
      photoImageFilePath = ProfileImagePath(this.photoImagePath);
    }
    // else {
    // photoImageFilePath =
    //   this.member &&
    //   this.member.photoFilename &&
    //   `${process.env.REACT_APP_SK_IM_PHOTO_ROOT_URL}/${this.member.photoFilename}`;
    // }

    return photoImageFilePath;
  }

  @computed
  get bgFilePath() {
    //
    let bgImageFilePath: string = '';
    bgImageFilePath = ProfileImagePath(this.backgroundImagePath);

    return bgImageFilePath;
  }

  @computed
  get profileViewName() {
    //
    let viewProfileName: string = '';

    if (this.displayNicknameFirst) {
      viewProfileName = this.nickName;
    } else {
      viewProfileName = parsePolyglotString(this.name);
    }

    return viewProfileName;
  }
}

decorate(SkProfileModel, {
  id: observable,
  entityVersion: observable,
  // member: observable,
  // memberType: observable,
  memberLocale: observable,
  pisAgreement: observable,
  signedDate: observable,
  // passwordAuthenticated: observable,
  // studySummaryConfigured: observable,
  // photoType: observable,
  photoImagePath: observable,
  // nickName: observable,
  backgroundImagePath: observable,
  selfIntroduction: observable,
  // followerCount: observable,
  // followingCount: observable,
  nickName: observable,
  displayNicknameFirst: observable,
  name: observable,
  phone: observable,
  employeeId: observable,
  companyName: observable,
  email: observable,
  companyCode: observable,
  language: observable,
  departmentCode: observable,
});

export default SkProfileModel;
