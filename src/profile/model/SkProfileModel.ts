import { DramaEntity, PatronKey } from '@nara.platform/accent';
import { decorate, observable } from 'mobx';
import { MemberType } from './MemberType';
import { MemberLocaleModel } from './MemberLocaleModel';
import { EmployeeModel } from './EmployeeModel';
import { PisAgreementModel } from './PisAgreementModel';
import { StudySummary } from './StudySummary';
import { FavoriteJobGroupModel } from './FavoriteJobGroupModel';
import { NameValueList } from '../../shared';
import { SkProfileCdoModel } from './SkProfileCdoModel';

export class SkProfileModel implements DramaEntity {
  id: string = '';
  entityVersion: number = 0;
  patronKey: PatronKey = {} as PatronKey;

  member: EmployeeModel= new EmployeeModel();
  memberType: MemberType = MemberType.SkMember;
  memberLocale: MemberLocaleModel = new MemberLocaleModel();
  pisAgreement: PisAgreementModel = new PisAgreementModel();
  signedDate : Date = new Date();
  studySummary : StudySummary = new StudySummary();
  passwordAuthenticated : boolean = false;
  favoriteJobGroup : FavoriteJobGroupModel = new FavoriteJobGroupModel();

  constructor(skProfile?: SkProfileModel) {
    //
    if (skProfile) {
      const patronKey = skProfile.patronKey || this.patronKey;
      const member  = skProfile.member && new EmployeeModel() || this.member;
      const pisAgreement = skProfile.pisAgreement && new PisAgreementModel() || this.pisAgreement;
      const studySummary = skProfile.studySummary && new StudySummary() || this.studySummary;
      const favoriteJobGroup = skProfile.favoriteJobGroup && new FavoriteJobGroupModel() || this.favoriteJobGroup;
      Object.assign(this, { ...skProfile, patronKey, member, pisAgreement, studySummary, favoriteJobGroup });
    }
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
          name: 'memberLocale',
          value: JSON.stringify(skProfile.memberLocale),
        },
        {
          name: 'pisAgreement',
          value: JSON.stringify(skProfile.pisAgreement),
        },
        {
          name: 'signedDate',
          value: skProfile.signedDate.toISOString(),
        },
        {
          name: 'studySummary',
          value: JSON.stringify(skProfile.studySummary),
        },
        {
          name: 'passwordAuthenticated',
          value: skProfile.passwordAuthenticated ? 'true' : 'false',
        },
        {
          name: 'favoriteJobGroup',
          value: JSON.stringify(skProfile.favoriteJobGroup),
        },
      ],
    };

    return asNameValues;
  }

  static asCdo(skProfile : SkProfileModel) : SkProfileCdoModel {
    return (
      {
        member: skProfile.member,
        memberLocale: skProfile.memberLocale,
      }
    );
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
  studySummary: observable,
  passwordAuthenticated: observable,
});
