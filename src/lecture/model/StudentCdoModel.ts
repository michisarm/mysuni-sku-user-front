import { decorate, observable } from 'mobx';
import { DenizenKey, PatronType } from '@nara.platform/accent';
import { patronInfo } from '@nara.platform/dock';
import { ProposalState } from 'shared/model';


class StudentCdoModel {
  //
  denizenKey?: DenizenKey = {} as DenizenKey;
  rollBookId: string = '';
  name: string = '';
  email: string = '';
  company: string = '';
  department: string = '';
  proposalState: ProposalState = ProposalState.Submitted;
  programLectureUsid: string = '';
  courseLectureUsid: string = '';

  leaderEmails: string[] = [];
  url: string = '';

  // Community용
  enClosed?: boolean;
  classroomId: string = '';
  approvalProcess?: boolean;

  constructor(student?: StudentCdoModel) {
    //
    if (student) {
      Object.assign(this, { ...student });
      this.denizenKey = { keyString: patronInfo.getPatronId(), patronType: PatronType.Audience } as DenizenKey;
    }
  }

}

decorate(StudentCdoModel, {
  denizenKey: observable,
  rollBookId: observable,
  name: observable,
  email: observable,
  company: observable,
  department: observable,
  proposalState: observable,
  programLectureUsid: observable,
  courseLectureUsid: observable,
  enClosed: observable,
  classroomId: observable,
  approvalProcess: observable,
});

export default StudentCdoModel;
