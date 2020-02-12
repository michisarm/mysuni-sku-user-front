import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import { LearningState } from 'shared';
import _ from 'lodash';
import StudentApi from '../apiclient/StudentApi';
import StudentCdoModel from '../../../model/StudentCdoModel';
import StudentJoinRdoModel from '../../../model/StudentJoinRdoModel';
import StudentCountRdoModel from '../../../model/StudentCountRdoModel';
import StudentModel from '../../../model/StudentModel';


@autobind
class StudentService {
  //
  static instance: StudentService;

  private studentApi: StudentApi;

  @observable
  studentCountMap: Map<string, StudentCountRdoModel> = new Map();

  @observable
  _studentJoins: StudentJoinRdoModel[] = [];

  /**
   * Course Lecture or Prgrame Lecture 내 Video Lecture Card 인 경우 Lecture Card Id로부터 StudentJoin 배열 정보
   */
  @observable
  _studentJoinsForVideo: StudentJoinRdoModel[] = [];

  @observable
  student: StudentModel = new StudentModel();

  /**
   * Course Lecture or Prgrame Lecture 내 Video Lecture Card 인 경우 Student Id로부터 Student 정보
   */
  @observable
  studentForVideo: StudentModel = new StudentModel();

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

  /**
   * Course Lecture or Prgrame Lecture 내 Video Lecture Card 인 경우 Lecture Card Id로부터 StudentJoin 배열 정보 가져오기
   * 업데이트 시간순(updateTime)으로 데이터 배열 정렬
   */
  @computed
  get studentJoinsForVideo(): StudentJoinRdoModel[] {
    //
    const studentJoins = this._studentJoinsForVideo as IObservableArray;
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

  /**
   * Course Lecture or Prgrame Lecture 내 Video Lecture Card 인 경우 Student Id로부터 Student 정보 가져오기
   */
  @action
  async findStudentForVideo(studentId: string, round?: number) {
    //
    const student = await this.studentApi.findStudent(studentId);
    return runInAction(() => {
      this.studentForVideo = new StudentModel(student);
      if (round) this.studentForVideo.round = round;
      return student;
    });
  }

  @action
  async findStudentToMap(studentId: string, round?: number) {
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

  /**
   * Course Lecture or Prgrame Lecture 내 Video Lecture Card 인 경우 Lecture Card Id로부터 StudentJoin 배열 정보 가져오기
   */
  @action
  async findIsJsonStudentForVideo(lectureCardId: string) {
    //
    const studentJoinRdos = await this.studentApi.findIsJsonStudent(lectureCardId);

    runInAction(() => this._studentJoinsForVideo = studentJoinRdos.map(studentJoinRdo => new StudentJoinRdoModel(studentJoinRdo)));
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

  @action
  clearForVideo() {
    this.studentForVideo = new StudentModel();
  }
}

StudentService.instance = new StudentService(StudentApi.instance);

export default StudentService;
