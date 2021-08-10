import { computed, decorate, observable } from 'mobx';
import { LangStrings } from 'shared/model';
import { PolyglotString } from '../../../shared/viewmodel/PolyglotString';

export class CompanyApproverModel {
  id: string = '';
  name: PolyglotString = { ko: '', en: '', zh: '' };
  rank: string = '';
  title: string = '';
  duty: string = '';
  email: string = '';
  phone: string = '';
  approverType: string = '';
  creationTime: number = 0;
  modificationTime: number = 0;
  companyCode: string = '';
  companyName: PolyglotString = { ko: '', en: '', zh: '' };
  departmentCode: string = '';
  departmentName: PolyglotString = { ko: '', en: '', zh: '' };

  chartDisplayed: boolean = false;
  displayOrder: string = '';
  retired: boolean = false;
  photoFileUrl: string = '';
  aplApproverType: string = '';

  constructor(companyApproverModel?: CompanyApproverModel) {
    if (companyApproverModel) {
      Object.assign(this, { ...companyApproverModel });
    }
  }
}

decorate(CompanyApproverModel, {
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

  aplApproverType: observable,
});
