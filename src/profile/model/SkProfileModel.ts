
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
    const asNameValues = {
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

    return asNameValues;
  }

  @computed
  get getSignedDate() {
    if (this.signedDate && this.signedDate !== '' ) {
      return new Date(this.signedDate).toISOString().slice(0, 10);
    }
    return '';
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
});

export default SkProfileModel;
