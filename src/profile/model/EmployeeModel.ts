import { decorate, observable } from 'mobx';
import { TeamModel } from './TeamModel';
import { MemberModel } from './MemberModel';
import { FavoriteJobGroupModel } from './FavoriteJobGroupModel';

export class EmployeeModel extends MemberModel {
  employeeId: string = '' ;      // 암호화
  name: string = '';
  email: string = '';           // 암호화
  phone: string = '';           // 암호화
  jobTitle : string = '';      //직위
  jobRank : string ='';         //직급 rank
  jobName : string ='';         //직무 job
  jobDuty : string ='';         //직책 duty
  base64Photo: string = '';     //base64 image 크기
  photoFileUrl:string ='';      //SK IM Photo URL
  team: TeamModel = new TeamModel();
  favoriteJobGroup: FavoriteJobGroupModel = new FavoriteJobGroupModel();



  constructor(employee?: EmployeeModel) {
    super();
    if (employee) {
      const team = employee.team && new TeamModel(employee.team) || this.team;
      const favoriteJobGroup = employee.favoriteJobGroup && new FavoriteJobGroupModel(employee.favoriteJobGroup) || this.favoriteJobGroup;
      Object.assign(this, { ...employee, favoriteJobGroup, team });
    }
  }
}

decorate( EmployeeModel, {
  employeeId: observable,
  name: observable,
  email: observable,
  phone: observable,
  jobTitle: observable,
  jobRank: observable,
  jobName: observable,
  jobDuty: observable,
  base64Photo: observable,
  photoFileUrl: observable,
  team: observable,
  favoriteJobGroup: observable,
});
