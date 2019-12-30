import { decorate, observable } from 'mobx';
import { MemberLocaleModel } from './MemberLocaleModel';
import { EmployeeModel } from './EmployeeModel';

export class SkProfileCdoModel {
  member: EmployeeModel= new EmployeeModel();
  memberLocale: MemberLocaleModel = new MemberLocaleModel();

  constructor(skProfile?: SkProfileCdoModel) {
    //
    if (skProfile) {
      const member  = skProfile.member && new EmployeeModel(skProfile.member) || this.member;
      const memberLocale = skProfile.memberLocale && new MemberLocaleModel(skProfile.memberLocale) || this.memberLocale;
      Object.assign(this, { ...skProfile, member, memberLocale });
    }
  }
}

decorate(SkProfileCdoModel, {
  member: observable,
  memberLocale: observable,
});
