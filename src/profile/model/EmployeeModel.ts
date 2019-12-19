import { decorate, observable } from 'mobx';
import { MemberModel } from './MemberModel';
import { FavoriteJobGroupModel } from './FavoriteJobGroupModel';
import { LangStrings } from '../../shared/model/LangStrings';

export class EmployeeModel extends MemberModel {
  employeeId: string = '' ;      // 암호화
  names: LangStrings = new  LangStrings();
  //name : string = '';
  email: string = '';           // 암호화
  phone: string = '';           // 암호화
  jobTitle : string = '';      //직위
  jobRank : string ='';         //직급 rank
  jobName : string ='';         //직무 job
  jobDuty : string ='';         //직책 duty
  base64Photo: string = '';     //base64 image 크기
  photoFileUrl:string ='';      //SK IM Photo URL
  // team: TeamModel = new TeamModel();

  companyCode : string ='';
  companyNames : LangStrings = new LangStrings();
  departmentCode : string='';
  departmentNames : LangStrings = new LangStrings();
  leaderId : string ='';
  leaderNames : string = '';

  favoriteJobGroup: FavoriteJobGroupModel = new FavoriteJobGroupModel();

  constructor(employee?: EmployeeModel) {
    super();
    if (employee) {
      const favoriteJobGroup = employee.favoriteJobGroup && new FavoriteJobGroupModel(employee.favoriteJobGroup) || this.favoriteJobGroup;
      Object.assign(this, { ...employee, favoriteJobGroup });
    }
  }

}

decorate( EmployeeModel, {
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
  companyCode: observable,
  companyNames: observable,
  departmentCode: observable,
  departmentNames: observable,
  leaderId: observable,
  leaderNames: observable,
  favoriteJobGroup: observable,
});
