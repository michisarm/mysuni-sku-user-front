import { computed, decorate, observable } from 'mobx';
import { LangStrings } from 'shared/model';
import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';

export class ApprovalMemberModel {
  id: string = '';
  name: PolyglotString = { ko: '', zh: '', en: '' };
  rank: string = '';
  title: string = '';
  duty: string = '';
  email: string = '';
  phone: string = '';
  approverType: string = '';
  creationTime: number = 0;
  modificationTime: number = 0;
  companyCode: string = '';
  companyName: PolyglotString = { ko: '', zh: '', en: '' };
  departmentCode: string = '';
  departmentName: PolyglotString = { ko: '', zh: '', en: '' };

  chartDisplayed: boolean = false;
  displayOrder: string = '';
  retired: boolean = false;
  photoFileUrl: string = '';
  myApprover: string = '';
  //2020 11 10 add
  aplApproverType: string = '';

  constructor(approvalMemberModel?: ApprovalMemberModel) {
    if (approvalMemberModel) {
      Object.assign(this, { ...approvalMemberModel });
    }
  }
}

decorate(ApprovalMemberModel, {
  id: observable,
  name: observable,
  rank: observable,
  title: observable,
  duty: observable,
  email: observable,
  phone: observable,
  approverType: observable,
  creationTime: observable,
  modificationTime: observable,
  companyCode: observable,
  companyName: observable,
  departmentCode: observable,
  departmentName: observable,

  chartDisplayed: observable,
  displayOrder: observable,
  retired: observable,
  photoFileUrl: observable,
  myApprover: observable,

  aplApproverType: observable,
});
