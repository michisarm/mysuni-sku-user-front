import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { computed, decorate, observable } from 'mobx';
import { NameValueList } from 'shared/model';
import MemberType from './MemberType';
import MemberLocaleModel from './MemberLocaleModel';
import EmployeeModel from './EmployeeModel';
import PisAgreementModel from './PisAgreementModel';
import ProfileImagePath from '../../../src/shared/components/Image/ProfileImagePath';

class SkProfileModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  member: EmployeeModel = new EmployeeModel();
  memberType: MemberType = MemberType.SkMember;
  memberLocale: MemberLocaleModel = new MemberLocaleModel();
  pisAgreement: PisAgreementModel = new PisAgreementModel();
  signedDate: string = '';
  passwordAuthenticated: boolean = false;
  studySummaryConfigured: boolean = false;

  photoType: string = '0'; //0 - IM(타 시스템의 사용자 증명사진), 1 - mySUNI에서 등록한 사용자 증명사진인 경우
  photoImage: string = ''; //mySUNI 로부터 사용자가 등록한 증명사진 이미지 base64 값

  nickName: string = ''; // 닉네임
  bgImage: string = ''; // 배경이미지
  introduce: string = ''; // 자기소개
  followerCount: number = 0; // 팔로워 숫자
  followingCount: number = 0; // 팔로잉 숫자
  nameFlag: string = 'R'; // 닉네임/실명 여부 플래그(R: 실명 ,  N: 닉네임)

  constructor(skProfile?: SkProfileModel) {
    //
    if (skProfile) {
      const patronKey = skProfile.patronKey || this.patronKey;
      const member =
        (skProfile.member && new EmployeeModel(skProfile.member)) ||
        this.member;
      const pisAgreement =
        (skProfile.pisAgreement &&
          new PisAgreementModel(skProfile.pisAgreement)) ||
        this.pisAgreement;
      Object.assign(this, { ...skProfile, patronKey, member, pisAgreement });
    }
  }

  @computed
  get departmentCode() {
    //
    return (this.member && this.member.departmentCode) || '';
  }

  static asNameValues(skProfile: SkProfileModel): NameValueList {
    const asNameValues1 = {
      nameValues: [
        {
          name: 'member',
          value: JSON.stringify(skProfile.member),
        },
        {
          name: 'memberType',
          value: skProfile.memberType,
        },
        {
          name: 'pisAgreement',
          value: JSON.stringify(skProfile.pisAgreement),
        },
        {
          name: 'locale',
          value: JSON.stringify(skProfile.memberLocale),
        },
        {
          name: 'passwordAuthenticated',
          value: skProfile.passwordAuthenticated ? 'true' : 'false',
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
    //
    let photoImageFilePath: string = '';

    if (this.photoImage && this.photoImage !== '') {
      photoImageFilePath = ProfileImagePath(this.photoImage);
    } else {
      photoImageFilePath =
        this.member &&
        this.member.photoFilename &&
        `${process.env.REACT_APP_SK_IM_PHOTO_ROOT_URL}/${this.member.photoFilename}`;
    }

    return photoImageFilePath;
  }

  @computed
  get bgFilePath() {
    //
    let bgImageFilePath: string = '';
    bgImageFilePath = ProfileImagePath(this.bgImage);

    return bgImageFilePath;
  }

  @computed
  get profileViewName() {
    //
    let viewProfileName: string = '';

    if (this.nameFlag === 'N' && this.nickName !== '') {
      viewProfileName = this.nickName;
    } else {
      viewProfileName = this.member && this.member.name;
    }

    return viewProfileName;
  }
}

decorate(SkProfileModel, {
  id: observable,
  entityVersion: observable,
  member: observable,
  memberType: observable,
  memberLocale: observable,
  pisAgreement: observable,
  signedDate: observable,
  passwordAuthenticated: observable,
  studySummaryConfigured: observable,
  photoType: observable,
  photoImage: observable,
  nickName: observable,
  bgImage: observable,
  introduce: observable,
  followerCount: observable,
  followingCount: observable,
  nameFlag: observable,
});

export default SkProfileModel;
