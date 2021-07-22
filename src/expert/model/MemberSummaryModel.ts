import { decorate, observable } from 'mobx';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export class MemberSummaryModel {
  //
  employeeId: string = '';
  name: PolyglotString | null = null;
  email: string = '';

  department: PolyglotString | null = null;
  position: string = '';
  photoId: string = '';
  introduction: PolyglotString | null = null;

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
