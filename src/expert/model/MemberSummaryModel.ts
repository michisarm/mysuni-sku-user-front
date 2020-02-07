import { decorate, observable } from 'mobx';

export class MemberSummaryModel {
  //
  employeeId: string = '';
  name: string = '';
  email: string = '';

  department: string = '';
  position: string = '';
  photoId: string = '';
  introduction: string = '';

  constructor(memberSummary?: MemberSummaryModel) {
    //
    if (memberSummary) Object.assign(this, { ...memberSummary });
  }
}

decorate(MemberSummaryModel, {
  employeeId: observable,
  department: observable,
  introduction: observable,
  name: observable,
  email: observable,
  photoId: observable,
  position: observable,
});
