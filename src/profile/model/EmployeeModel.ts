import { computed, decorate, observable } from 'mobx';

import { LangStrings } from 'shared/model/LangStrings';
import MemberModel from './MemberModel';
import FavoriteJobGroupModel from './FavoriteJobGroupModel';
import CurrentJobGroupModel from './CurrentJobGroupModel';

class EmployeeModel extends MemberModel {
  //
  employeeId: string = ''; // 암호화
  names: LangStrings = new LangStrings();
  //name : string = '';
  email: string = ''; // 암호화
  phone: string = ''; // 암호화
  jobTitle: string = ''; //직위
  jobRank: string = ''; //직급 rank
  jobName: string = ''; //직무 job
  jobDuty: string = ''; //직책 duty
  base64Photo: string = ''; //base64 image 크기
  photoFileUrl: string = ''; //SK IM Photo URL
  photoFilename: string = '';

  // team: TeamModel = new TeamModel();

  companyCode: string = '';
  companyNames: LangStrings = new LangStrings();
  departmentCode: string = '';
  departmentNames: LangStrings = new LangStrings();
  leaderId: string = '';
  leaderNames: string = '';

  favoriteJobGroup: FavoriteJobGroupModel = new FavoriteJobGroupModel();
  currentJobGroup: CurrentJobGroupModel = new CurrentJobGroupModel();

  constructor(employee?: EmployeeModel) {
    super();
    if (employee) {
      const favoriteJobGroup =
        (employee.favoriteJobGroup &&
          new FavoriteJobGroupModel(employee.favoriteJobGroup)) ||
        this.favoriteJobGroup;
      const currentJobGroup =
        (employee.currentJobGroup &&
          new CurrentJobGroupModel(employee.currentJobGroup)) ||
        this.currentJobGroup;
      const names =
        (employee.names && new LangStrings(employee.names)) || this.names;
      const companyNames =
        (employee.companyNames && new LangStrings(employee.companyNames)) ||
        this.companyNames;
      const departmentNames =
        (employee.departmentNames &&
          new LangStrings(employee.departmentNames)) ||
        this.departmentNames;
      Object.assign(this, {
        ...employee,
        currentJobGroup,
        favoriteJobGroup,
        names,
        companyNames,
        departmentNames,
      });
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
  get company() {
    if (this.companyNames && this.companyNames.langStringMap) {
      return (
        this.companyNames.langStringMap.get(
          this.companyNames.defaultLanguage
        ) || ''
      );
    }
    return '';
  }

  @computed
  get department() {
    if (this.departmentNames && this.departmentNames.langStringMap) {
      return (
        this.departmentNames.langStringMap.get(
          this.departmentNames.defaultLanguage
        ) || ''
      );
    }
    return '';
  }

  @computed
  get photoFilePath() {
    //
    if (!this.photoFilename || !this.companyCode) {
      return undefined;
    } else {
      return `/profile/photo${this.photoFilename}`;
    }
  }
}

decorate(EmployeeModel, {
  employeeId: observable,
  names: observable,
  email: observable,
  phone: observable,
  jobTitle: observable,
  jobRank: observable,
  jobName: observable,
  jobDuty: observable,
  base64Photo: observable,
  photoFileUrl: observable,
  photoFilename: observable,
  companyCode: observable,
  companyNames: observable,
  departmentCode: observable,
  departmentNames: observable,
  leaderId: observable,
  leaderNames: observable,
  favoriteJobGroup: observable,
  currentJobGroup: observable,
});

export default EmployeeModel;
