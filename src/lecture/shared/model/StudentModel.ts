import { decorate, observable } from 'mobx';
import { DramaEntityObservableModel, NameValueList, ProposalState } from 'shared';
import LearningState from '../../../shared/model/LearningState';
import StudentScoreModel from './StudentScoreModel';
import JoinRequestModel from './JoinRequestModel';


class StudentModel extends DramaEntityObservableModel {
  //

  name: string = '';
  email: string = '';
  company: string = '';
  department: string = '';
  proposalState: ProposalState = ProposalState.Submitted;
  learningState: LearningState | undefined;
  sessionId: string = '';
  isFinishMedia: boolean = false;
  studentScore: StudentScoreModel = new StudentScoreModel();
  creationTime: number = 0;
  updateTime: number = 0;
  programLectureUsid: string = '';
  courseLectureUsid: string = '';
  joinRequests: JoinRequestModel[] = [];
  markCompleted: boolean = false;
  rollBookId: string = '';
  examAttendance: boolean = false;
  updateTimeForTest: number = 0;
  homeworkFileBoxId: string = '';

  //UI
  round: number = 0;

  constructor(student?: StudentModel) {
    //
    super();
    if (student) {
      Object.assign(this, { ...student });
      this.studentScore = student.studentScore && new StudentScoreModel(student.studentScore) || this.studentScore;
      this.joinRequests = student.joinRequests && student.joinRequests.length
        && student.joinRequests.map(request => new JoinRequestModel(request)) || this.joinRequests;
    }
  }
}

decorate(StudentModel, {
  name: observable,
  email: observable,
  company: observable,
  department: observable,
  proposalState: observable,
  learningState: observable,
  sessionId: observable,
  isFinishMedia: observable,
  studentScore: observable,
  creationTime: observable,
  updateTime: observable,
  programLectureUsid: observable,
  courseLectureUsid: observable,
  joinRequests: observable,
  markCompleted: observable,
  rollBookId: observable,
  examAttendance: observable,
  updateTimeForTest: observable,
  homeworkFileBoxId: observable,
  round: observable,
});

export default StudentModel;
