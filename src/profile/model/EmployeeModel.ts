import { decorate, observable } from 'mobx';
import { TeamModel } from './TeamModel';
import { MemberModel } from './MemberModel';
import { FavoriteJobGroupModel } from './FavoriteJobGroupModel';

export class EmployeeModel extends MemberModel {
  employeeId: string = '' ;      // 암호화
  name: string = '';
  email: string = '';           // 암호화
  phone: string = '';           // 암호화
  base64Photo: string = '';
  team: TeamModel = new TeamModel();
  favoriteJobGroup: FavoriteJobGroupModel = new FavoriteJobGroupModel();
  jobTitle:string='';
  jobPosition:string='';
  jobDuty:string='';
  jobTask:string='';


  constructor(employee?: EmployeeModel) {
    super();
    if (employee) {
      const memberId =  employee.email && employee.email || '';
      const team = employee.team && new TeamModel(employee.team) || this.team;
      const favoriteJobGroup = employee.favoriteJobGroup && new FavoriteJobGroupModel(employee.favoriteJobGroup) || this.favoriteJobGroup;
      Object.assign(this, { ...employee, favoriteJobGroup, team, memberId });
    }
  }
}

decorate(EmployeeModel, {
  employeeId: observable,
  name: observable,
  email: observable,
  phone: observable,
  base64Photo: observable,
  team: observable,
  jobTitle: observable,
  jobDuty: observable,
  jobPosition: observable,
  jobTask: observable,
});
