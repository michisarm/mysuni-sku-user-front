import { computed, decorate, observable } from 'mobx';
import { LangStrings } from 'shared/model';

export class ApprovalMemberModel {
  id: string = '';
  names: LangStrings = new LangStrings();
  employeeId: string = '';
  ranks: LangStrings = new LangStrings();
  titles: LangStrings = new LangStrings();
  duties: LangStrings = new LangStrings();
  email: string = '';
  phone: string = '';
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

  constructor(approvalMemberModel?: ApprovalMemberModel) {
    if (approvalMemberModel) {
      const names = new LangStrings(approvalMemberModel.names);
      const ranks = new LangStrings(approvalMemberModel.ranks);
      const titles = new LangStrings(approvalMemberModel.titles);
      const duties = new LangStrings(approvalMemberModel.duties);
      const companyNames = new LangStrings(approvalMemberModel.companyNames);
      const departmentNames = new LangStrings(approvalMemberModel.departmentNames);
      Object.assign(this, { ...approvalMemberModel, names, ranks, titles, duties, companyNames, departmentNames });
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

decorate(ApprovalMemberModel, {
  id: observable,
  names: observable,
  employeeId: observable,
  ranks: observable,
  titles: observable,
  duties: observable,
  email: observable,
  phone: observable,
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
});
