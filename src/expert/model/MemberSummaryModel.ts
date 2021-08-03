import { decorate, observable } from 'mobx';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';

export class MemberSummaryModel {
  //
  employeeId: string = '';
  // name: string = '';
  name: PolyglotString | null = null;
  email: string = '';

  department: PolyglotString | null = null;
  // department: string = '';
  position: string = '';
  photoId: string = '';
  introduction: PolyglotString | null = null;
  // introduction: string = '';

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
