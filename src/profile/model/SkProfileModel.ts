
import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { computed, decorate, observable } from 'mobx';
import { NameValueList } from 'shared/model';
import MemberType from './MemberType';
import MemberLocaleModel from './MemberLocaleModel';
import EmployeeModel from './EmployeeModel';
import PisAgreementModel from './PisAgreementModel';


class SkProfileModel implements DramaEntity {
  //
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  member: EmployeeModel= new EmployeeModel();
  memberType: MemberType = MemberType.SkMember;
  memberLocale: MemberLocaleModel = new MemberLocaleModel();
  pisAgreement: PisAgreementModel = new PisAgreementModel();
  signedDate : string = '';
  passwordAuthenticated : boolean = false;
  studySummaryConfigured: boolean = false;

  photoType: string = '0';  //0 - IM(타 시스템의 사용자 증명사진), 1 - mySUNI에서 등록한 사용자 증명사진인 경우
  photoImage: string = '';  //mySUNI 로부터 사용자가 등록한 증명사진 이미지 base64 값

  constructor(skProfile?: SkProfileModel) {
    //
    if (skProfile) {
      const patronKey = skProfile.patronKey || this.patronKey;
      const member  = skProfile.member && new EmployeeModel(skProfile.member) || this.member;
      const pisAgreement = skProfile.pisAgreement && new PisAgreementModel(skProfile.pisAgreement) || this.pisAgreement;
      Object.assign(this, { ...skProfile, patronKey, member, pisAgreement });
    }
  }

  @computed
  get departmentCode() {
    //
    return this.member && this.member.departmentCode || '';
  }

  static asNameValues(skProfile : SkProfileModel) : NameValueList {
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
    if (this.signedDate && this.signedDate !== '' ) {
      return new Date(this.signedDate).toISOString().slice(0, 10);
    }
    return '';
  }

  @computed
  get photoFilePath() {
    //
    let photoImageFilePath: string = '';

    //IM 사용자 증명사진 보이기(타 시스템 이관 이미지 파일)
    if (!this.photoType || this.photoType === '0')
    {
      photoImageFilePath = this.member && this.member.photoFilename && `${process.env.REACT_APP_SK_IM_PHOTO_ROOT_URL}/${this.member.companyCode.toLowerCase()}/${this.member.photoFilename}`;
    }
    //mySUNI 사이트(depot)에서 등록한 사용자 증명사진 보이기
    else if (this.photoType === '1')
    {
      photoImageFilePath = this.photoImage; //base64Photo
    }

    return photoImageFilePath;
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
});

export default SkProfileModel;
