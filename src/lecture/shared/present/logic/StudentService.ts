import { action, computed, IObservableArray, observable, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import {LearningState } from 'shared/model';
import _ from 'lodash';
import StudentApi from '../apiclient/StudentApi';
import StudentCdoModel from '../../../model/StudentCdoModel';
import StudentJoinRdoModel from '../../../model/StudentJoinRdoModel';
import StudentCountRdoModel from '../../../model/StudentCountRdoModel';
import StudentModel from '../../../model/StudentModel';
import StudentInfoModel from '../../../model/StudentInfoModel';
import StudentFlowApi from '../apiclient/StudentFlowApi';
import StudentCubeModel from '../../../model/StudentCubeModel';


@autobind
class StudentService {
  //
  static instance: StudentService;

  private studentApi: StudentApi;

  @observable
  _studentInfo: StudentInfoModel | null = null;

  @action
  getLectureInfo(lectureId: string): StudentModel {
    //
    let lecture: StudentModel | null = null;

    if (this._studentInfo && this._studentInfo.student) {
      this.student = new StudentModel(this._studentInfo.student);
    }

    if (this._studentInfo && this._studentInfo.lecture) {
      this._studentInfo.lecture.lectures.map((info: StudentModel) => {
        if (info.lectureUsid === lectureId) {
          lecture = new StudentModel(info);
        }
      });
    }

    if (this._studentInfo && this._studentInfo.course) {

      this._studentInfo.course.courses.map((courseInfo: StudentCubeModel) => {
        if (courseInfo && !lecture) {
          courseInfo.lectures.map((info: StudentModel) => {
            if (info.lectureUsid === lectureId) {
              lecture = new StudentModel(info);
            }
          });
        }

        if (courseInfo.student.lectureUsid === lectureId) {
          lecture = new StudentModel(courseInfo.student);
        }
      });
    }

    // @ts-ignore
    return lecture;
  }

  @computed
  get StudentInfos() {
    return this._studentInfo;
  }

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
  _studentForVideo: StudentModel = new StudentModel();

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

  @computed
  get studentForVideo(): StudentModel
  {
    return this._studentForVideo;
  }

  /**
   * Course Lecture or Prgrame Lecture 내 Video Lecture Card 인 경우 Lecture Card Id로부터 StudentJoin 배열 정보 가져온뒤
   * 업데이트 시간순(updateTime)으로 StudentJoin을 정렬해서 최상위 한건을 대상으로 학생정보 가져옴.
   *
   */
  @action
  async getStudentForVideo(lectureCardId: string): Promise<StudentModel>
  {
    //
    let student: StudentModel = new StudentModel();
    const studentJoinsForVideo = await this.findIsJsonStudentForVideo(lectureCardId);

    if (studentJoinsForVideo && studentJoinsForVideo.length)
    {
      studentJoinsForVideo.sort(this.compare);
      const studentJoin = studentJoinsForVideo[0];
      // console.log(studentJoin);
      student = await this.findStudentForVideo(studentJoin!.studentId);

    } else this.clearForVideo();

    return student;
  }

  @action
  async setStudentInfo(serviceId: string, lectureCardIds: string[], courseLectureIds: string[], preLectureCardIds: string[]) {
    //
    this._studentInfo = null;

    const studentInfo = await StudentFlowApi.instance.getLectureStudentView(serviceId, lectureCardIds, courseLectureIds, preLectureCardIds);

    if (studentInfo) {
      return runInAction(() => {
        this._studentInfo = new StudentInfoModel(studentInfo);
      });
    }

    return studentInfo;
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

    runInAction(() => {
      this._studentForVideo = new StudentModel(student);
      if (round) this._studentForVideo.round = round;
    });

    return student;

    // this._studentInfo = new StudentInfoModel(students);
    //
    // return this._studentInfo.findByLectureUsid(studentId) || new StudentModel();
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
    this._studentForVideo = new StudentModel();
  }

  @action
  async findPreCourseStudentList(lectureCardIds: string[]) {
    return this.studentApi.findPreCourseStudentList(lectureCardIds);
  }
}

StudentService.instance = new StudentService(StudentApi.instance);

export default StudentService;
