import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { computed, decorate, observable } from 'mobx';
import { NameValueList } from 'shared/model';
import MemberLocaleModel from './MemberLocaleModel';
import PisAgreementModel from './PisAgreementModel';
import ProfileImagePath from '../../../src/shared/components/Image/ProfileImagePath';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import defaultProfileImg from 'style/../../public/images/all/img-profile-56-px.png';

class SkProfileModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  memberLocale: MemberLocaleModel = new MemberLocaleModel();
  pisAgreement: PisAgreementModel = new PisAgreementModel();
  signedDate: string = '';
  photoImagePath: string = ''; //mySUNI 로부터 사용자가 등록한 증명사진 이미지 주소
  gdiPhotoImagePath: string = ''; // gdi를 통해 업데이트한 이미지 주소값
  useGdiPhoto: boolean = false;
  backgroundImagePath: string = ''; // 배경이미지 주소

  nickname: string = ''; // 닉네임
  selfIntroduction: string = ''; // 자기소개
  displayNicknameFirst: boolean = false; // 닉네임/실명 여부 값(false: 실명, true: 닉네임)
  departmentName: PolyglotString = { ko: '', en: '', zh: '' };
  departmentCode: string = '';
  email: string = '';
  name: PolyglotString = { ko: '', en: '', zh: '' };
  phone: string = '';
  employeeId: string = '';
  companyName: PolyglotString = { ko: '', en: '', zh: '' };
  companyCode: string = '';
  language: string = 'Korean';
  userGroupSequences: { sequences: number[] } = { sequences: [] };

  constructor(skProfile?: SkProfileModel) {
    if (skProfile) {
      const patronKey = skProfile.patronKey || this.patronKey;
      const pisAgreement =
        (skProfile.pisAgreement &&
          new PisAgreementModel(skProfile.pisAgreement)) ||
        this.pisAgreement;
      Object.assign(this, { ...skProfile, patronKey, pisAgreement });
    }
  }

  static asNameValues(skProfile: SkProfileModel): NameValueList {
    const asNameValues1 = {
      nameValues: [
        {
          name: 'pisAgreement',
          value: JSON.stringify(skProfile.pisAgreement),
        },
        {
          name: 'locale',
          value: JSON.stringify(skProfile.memberLocale),
        },
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
    if (this.useGdiPhoto === true) {
      return `/profile/photo${this.gdiPhotoImagePath}`;
    }
    if (
      this.photoImagePath === undefined ||
      this.photoImagePath === null ||
      this.photoImagePath === ''
    ) {
      return defaultProfileImg;
    }
    return this.photoImagePath;
  }

  @computed
  get bgFilePath() {
    let bgImageFilePath: string = '';
    bgImageFilePath = ProfileImagePath(this.backgroundImagePath);

    return bgImageFilePath;
  }

  @computed
  get profileViewName() {
    let viewProfileName: string = '';

    if (this.displayNicknameFirst) {
      viewProfileName = this.nickname;
    } else {
      viewProfileName = parsePolyglotString(this.name);
    }

    return viewProfileName;
  }
}

decorate(SkProfileModel, {
  id: observable,
  entityVersion: observable,
  memberLocale: observable,
  pisAgreement: observable,
  signedDate: observable,
  photoImagePath: observable,
  backgroundImagePath: observable,
  selfIntroduction: observable,
  nickname: observable,
  displayNicknameFirst: observable,
  name: observable,
  phone: observable,
  employeeId: observable,
  companyName: observable,
  email: observable,
  companyCode: observable,
  language: observable,
  departmentCode: observable,
  userGroupSequences: observable,
});

export default SkProfileModel;
