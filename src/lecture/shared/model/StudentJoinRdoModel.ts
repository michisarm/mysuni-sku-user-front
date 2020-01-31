import { decorate, observable } from 'mobx';
import { LearningState, ProposalState } from 'shared';


class StudentJoinRdoModel {
  //
  rollBookId: string = '';
  studentId: string = '';
  round: number = 0;
  join: boolean = false;

  learningState: LearningState | null = null;
  proposalState: ProposalState = ProposalState.Submitted;
  updateTime: number = 0;

  constructor(studentJoinRdo?: StudentJoinRdoModel) {
    //
    if (studentJoinRdo) {
      Object.assign(this, { ...studentJoinRdo });
    }
  }
}

decorate(StudentJoinRdoModel, {
  rollBookId: observable,
  studentId: observable,
  round: observable,
  join: observable,
  learningState: observable,
  proposalState: observable,
  updateTime: observable,
});

export default StudentJoinRdoModel;
