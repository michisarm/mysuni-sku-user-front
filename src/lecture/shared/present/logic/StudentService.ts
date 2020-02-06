import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { LearningState } from 'shared';
import _ from 'lodash';
import StudentApi from '../apiclient/StudentApi';
import StudentCdoModel from '../../model/StudentCdoModel';
import StudentJoinRdoModel from '../../model/StudentJoinRdoModel';
import StudentCountRdoModel from '../../model/StudentCountRdoModel';
import StudentModel from '../../model/StudentModel';


@autobind
class StudentService {
  //
  static instance: StudentService;

  private studentApi: StudentApi;

  @observable
  studentCountMap: Map<string, StudentCountRdoModel> = new Map();

  @observable
  _studentJoins: StudentJoinRdoModel[] = [];

  @observable
  student: StudentModel = new StudentModel();


  constructor(studentApi: StudentApi) {
    this.studentApi = studentApi;
  }

  @computed
  get studentCounts() {
    const studentCounts: StudentCountRdoModel[] = [];
    this.studentCountMap.forEach(value => studentCounts.push(value));
    return studentCounts;
  }

  @computed
  get studentJoins(): StudentJoinRdoModel[] {
    //
    const studentJoins = this._studentJoins as IObservableArray;
    return studentJoins.peek().filter((studentJoin: StudentJoinRdoModel) => studentJoin.join).sort(this.compare);
  }

  compare(studentJoin1: StudentJoinRdoModel, studentJoin2: StudentJoinRdoModel) {
    if (studentJoin1.updateTime < studentJoin2.updateTime) return 1;
    return -1;
  }

  // Student ----------------------------------------------------------------------------------------------------------

  registerStudent(studentCdo: StudentCdoModel) {
    return this.studentApi.registerStudent(studentCdo);
  }

  joinCommunity(studentCdo: StudentCdoModel) {
    return this.studentApi.joinCommunity(studentCdo);
  }

  studentMarkComplete(rollBookId: string) {
    return this.studentApi.studentMarkComplete(rollBookId);
  }

  removeStudent(rollBookId: string) {
    return this.studentApi.removeStudent(rollBookId);
  }

  modifyLearningState(studentId: string, learningState: LearningState) {
    return this.studentApi.modifyLearningState(studentId, learningState);
  }

  modifyStudent(studentId: string, fileBoxId: string) {
    return this.studentApi.modifyStudent(studentId, fileBoxId);
  }

  modifyStudentForExam(studentId: string, examId: string) {
    return this.studentApi.modifyStudentForExam(studentId, examId);
  }

  modifyStudentForCoursework(studentId: string, fileBoxId: string ) {
    return this.studentApi.modifyStudentForCoursework(studentId, fileBoxId);
  }

  @action
  async findStudentByRollBookId(rollBookId: string, round?: number) {
    //
    const student = await this.studentApi.findStudentByRollBookId(rollBookId);
    return runInAction(() => {
      this.student = new StudentModel(student);
      if (round) this.student.round = round;
      return student;
    });
  }

  @action
  async findStudent(studentId: string, round?: number) {
    //
    const student = await this.studentApi.findStudent(studentId);
    return runInAction(() => {
      this.student = new StudentModel(student);
      if (round) this.student.round = round;
      return student;
    });
  }

  @action
  async findStudentCount(rollBookId: string) {
    //
    const studentCountRdo = await this.studentApi.findStudentCount(rollBookId);

    runInAction(() => this.studentCountMap.set(rollBookId, new StudentCountRdoModel(studentCountRdo)));
    return studentCountRdo;
  }

  @action
  async findIsJsonStudent(lectureCardId: string) {
    //
    const studentJoinRdos = await this.studentApi.findIsJsonStudent(lectureCardId);

    runInAction(() => this._studentJoins = studentJoinRdos.map(studentJoinRdo => new StudentJoinRdoModel(studentJoinRdo)));
    return studentJoinRdos;
  }

  @action
  async findIsJsonStudentByCube(lectureCardId: string) {
    //
    const studentJoinRdos = await this.studentApi.findIsJsonStudentByCube(lectureCardId);

    runInAction(() => this._studentJoins = studentJoinRdos.map(studentJoinRdo => new StudentJoinRdoModel(studentJoinRdo)));
    return studentJoinRdos;
  }

  @action
  setStudentProp(name: string, value: any) {
    this.student = _.set(this.student, name, value);
  }

  @action
  clear() {
    this.student = new StudentModel();
  }
}

StudentService.instance = new StudentService(StudentApi.instance);

export default StudentService;
