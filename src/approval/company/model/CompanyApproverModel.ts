import { computed, decorate, observable } from 'mobx';
import { LangStrings } from 'shared/model';

export class CompanyApproverModel {
  id: string = '';
  names: LangStrings = new LangStrings();
  employeeId: string = '';
  ranks: LangStrings = new LangStrings();
  titles: LangStrings = new LangStrings();
  duties: LangStrings = new LangStrings();
  email: string = '';
  phone: string = '';
  approverType: string = '';
  creationTime: number = 0;
  modificationTime: number = 0;
  companyCode: string = '';
  companyNames: LangStrings = new LangStrings();
  departmentCode: string = '';
  departmentNames: LangStrings = new LangStrings();

  chartDisplayed: boolean = false;
  displayOrder: string = '';
  retired: boolean = false;
  photoFileUrl: string = '';
  myApprover: string = '';

  constructor(companyApproverModel?: CompanyApproverModel) {
    if (companyApproverModel) {
      const names = new LangStrings(companyApproverModel.names);
      const ranks = new LangStrings(companyApproverModel.ranks);
      const titles = new LangStrings(companyApproverModel.titles);
      const duties = new LangStrings(companyApproverModel.duties);
      const companyNames = new LangStrings(companyApproverModel.companyNames);
      const departmentNames = new LangStrings(companyApproverModel.departmentNames);
      Object.assign(this, { ...companyApproverModel, names, ranks, titles, duties, companyNames, departmentNames });
    }
  }

  @computed
  get name() {
    if (this.names && this.names.langStringMap) {
      return this.names.langStringMap.get(this.names.defaultLanguage) || '';
    }
    return '';
  }

  @computed
  get rankName() {
    if (this.ranks && this.ranks.langStringMap) {
      return this.ranks.langStringMap.get(this.ranks.defaultLanguage) || '';
    }
    return '';
  }

  @computed
  get titleName() {
    if (this.titles && this.titles.langStringMap) {
      return this.titles.langStringMap.get(this.titles.defaultLanguage) || '';
    }
    return '';
  }

  @computed
  get dutiesName() {
    if (this.duties && this.titles.langStringMap) {
      return this.duties.langStringMap.get(this.duties.defaultLanguage) || '';
    }
    return '';
  }

  @computed
  get companyName() {
    if (this.companyNames && this.companyNames.langStringMap) {
      return this.companyNames.langStringMap.get(this.companyNames.defaultLanguage) || '';
    }
    return '';
  }

  @computed
  get departmentName() {
    if (this.departmentNames && this.departmentNames.langStringMap) {
      return this.departmentNames.langStringMap.get(this.departmentNames.defaultLanguage) || '';
    }
    return '';
  }

}

decorate(CompanyApproverModel, {
  id: observable,
  names: observable,
  employeeId: observable,
  ranks: observable,
  titles: observable,
  duties: observable,
  email: observable,
  phone: observable,
  approverType: observable,
  creationTime: observable,
  modificationTime: observable,
  companyCode: observable,
  companyNames: observable,
  departmentCode: observable,
  departmentNames: observable,

  chartDisplayed: observable,
  displayOrder: observable,
  retired: observable,
  photoFileUrl: observable,
  myApprover: observable,
});
