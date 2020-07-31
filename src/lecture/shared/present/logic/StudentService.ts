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


const students = {
  'own': {
    'name': 'SK**',
    'email': 'SKCC.hug01@sk.com\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u000f',
    'company': 'SK주식회사 C&C',
    'department': '공용계정조직',
    'proposalState': 'Approved',
    'learningState': 'Progress',
    'sessionId': null,
    'studentScore': {
      'testScoreList': [],
      'testTotalScore': 0,
      'homeworkScore': 0,
      'numberOfTrials': 0,
      'latestScore': 0,
      'gotEssay': false
    },
    'creationTime': 1592186012689,
    'updateTime': 1592186012689,
    'programLectureUsid': null,
    'courseLectureUsid': null,
    'joinRequests': null,
    'markComplete': false,
    'rollBookId': null,
    'examAttendance': false,
    'updateTimeForTest': 0,
    'homeworkFileBoxId': null,
    'sumViewSeconds': '10',
    'durationViewSeconds': '20',
    'stamped': false,
    'lectureUsid': 'P-LECTURE-23',
    'serviceType': 'Program',
    'phaseCount': 9,
    'completePhaseCount': 1,
    'leaderEmails': null,
    'url': null,
    'enrolledState': null,
    'finishMedia': false,
    'lectureCardUsid': null
  },
  'lectures': [
    {
      'id': '019f5c94-ed5f-4e32-8a4c-82f37cacfbd5',
      'entityVersion': 1,
      'patronKey': {
        'keyString': 'r46u@ne1-m2',
        'patronType': 'Denizen',
        'sequenceStringAs36': 'r46u',
        'cineroomKey': false,
        'denizenKey': true,
        'audienceKey': false,
        'pavilionKey': false
      },
      'name': 'SK**',
      'email': 'SKCC.hug01@sk.com\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u000f',
      'company': 'SK주식회사 C&C',
      'department': '공용계정조직',
      'proposalState': 'Approved',
      'learningState': 'Progress',
      'sessionId': null,
      'studentScore': {
        'testScoreList': [],
        'testTotalScore': 0,
        'homeworkScore': 0,
        'numberOfTrials': 0,
        'latestScore': 0,
        'gotEssay': false
      },
      'creationTime': 1590551665955,
      'updateTime': 1590551665985,
      'programLectureUsid': '',
      'courseLectureUsid': '',
      'joinRequests': null,
      'markComplete': false,
      'rollBookId': '0272e3e1-2cfb-4104-9a72-e075011c220d',
      'examAttendance': false,
      'updateTimeForTest': 1590551665985,
      'homeworkFileBoxId': null,
      'sumViewSeconds': '10',
      'durationViewSeconds': '20',
      'stamped': false,
      'lectureUsid': 'LECTURE-CARD-1yq',
      'serviceType': 'Lecture',
      'phaseCount': 0,
      'completePhaseCount': 0,
      'leaderEmails': null,
      'url': null,
      'enrolledState': null,
      'finishMedia': false,
      'lectureCardUsid': 'LECTURE-CARD-1yq'
    },
    {
      'id': '49efebef-d687-4763-892d-e4cb2a3ec0fa',
      'entityVersion': 1,
      'patronKey': {
        'keyString': 'r46u@ne1-m2',
        'patronType': 'Denizen',
        'sequenceStringAs36': 'r46u',
        'cineroomKey': false,
        'denizenKey': true,
        'audienceKey': false,
        'pavilionKey': false
      },
      'name': 'SK**',
      'email': 'SKCC.hug01@sk.com\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u000f',
      'company': 'SK주식회사 C&C',
      'department': '공용계정조직',
      'proposalState': 'Approved',
      'learningState': 'Progress',
      'sessionId': null,
      'studentScore': {
        'testScoreList': [],
        'testTotalScore': 0,
        'homeworkScore': 0,
        'numberOfTrials': 0,
        'latestScore': 0,
        'gotEssay': false
      },
      'creationTime': 1592544291763,
      'updateTime': 1592544291771,
      'programLectureUsid': '',
      'courseLectureUsid': '',
      'joinRequests': null,
      'markComplete': false,
      'rollBookId': 'afe98148-0aaf-4fcc-a3dd-1cf1e02e2ea0',
      'examAttendance': false,
      'updateTimeForTest': 1592544291771,
      'homeworkFileBoxId': null,
      'sumViewSeconds': '15',
      'durationViewSeconds': '50',
      'stamped': false,
      'lectureUsid': 'LECTURE-CARD-1yr',
      'serviceType': 'Lecture',
      'phaseCount': 0,
      'completePhaseCount': 0,
      'leaderEmails': null,
      'url': null,
      'enrolledState': null,
      'finishMedia': false,
      'lectureCardUsid': 'LECTURE-CARD-1yr'
    }
  ],
  'courses': [
    {
      'course_lecture_id': 'C-LECTURE-2w',
      'lectures': [
        {
          'id': '4aee95b6-a481-40c4-8225-5b2ff17c9298',
          'entityVersion': 2,
          'patronKey': {
            'keyString': 'r46u@ne1-m2',
            'patronType': 'Denizen',
            'sequenceStringAs36': 'r46u',
            'cineroomKey': false,
            'denizenKey': true,
            'audienceKey': false,
            'pavilionKey': false
          },
          'name': 'SK**',
          'email': 'SKCC.hug01@sk.com\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u000f',
          'company': 'SK주식회사 C&C',
          'department': '공용계정조직',
          'proposalState': 'Approved',
          'learningState': 'TestWaiting',
          'sessionId': null,
          'studentScore': {
            'testScoreList': [
              0
            ],
            'testTotalScore': 0,
            'homeworkScore': 0,
            'numberOfTrials': 1,
            'latestScore': 0,
            'gotEssay': true
          },
          'creationTime': 1591854069788,
          'updateTime': 1591854069793,
          'programLectureUsid': '',
          'courseLectureUsid': '',
          'joinRequests': null,
          'markComplete': false,
          'rollBookId': '128bbd36-61c1-43eb-8495-67df3ce90088',
          'examAttendance': true,
          'updateTimeForTest': 1591854083068,
          'homeworkFileBoxId': null,
          'sumViewSeconds': '10',
          'durationViewSeconds': '20',
          'stamped': false,
          'lectureUsid': 'LECTURE-CARD-1yg',
          'serviceType': 'Lecture',
          'phaseCount': 0,
          'completePhaseCount': 0,
          'leaderEmails': null,
          'url': null,
          'enrolledState': null,
          'finishMedia': false,
          'lectureCardUsid': 'LECTURE-CARD-1yg'
        }
      ]
    },
    {
      'course_lecture_id': 'C-LECTURE-2u',
      'lectures': [
        {
          'id': '880e9592-991f-42f0-a5e7-012643e2f666',
          'entityVersion': 6,
          'patronKey': {
            'keyString': 'r46u@ne1-m2',
            'patronType': 'Denizen',
            'sequenceStringAs36': 'r46u',
            'cineroomKey': false,
            'denizenKey': true,
            'audienceKey': false,
            'pavilionKey': false
          },
          'name': 'SK**',
          'email': 'SKCC.hug01@sk.com\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u000f',
          'company': 'SK주식회사 C&C',
          'department': '공용계정조직',
          'proposalState': 'Approved',
          'learningState': 'Progress',
          'sessionId': null,
          'studentScore': {
            'testScoreList': [],
            'testTotalScore': 0,
            'homeworkScore': 0,
            'numberOfTrials': 0,
            'latestScore': 0,
            'gotEssay': false
          },
          'creationTime': 1590454883929,
          'updateTime': 1590643672638,
          'programLectureUsid': '',
          'courseLectureUsid': '',
          'joinRequests': null,
          'markComplete': false,
          'rollBookId': '90ad5e89-5a9f-4ec1-baf1-84d9ac7f088d',
          'examAttendance': false,
          'updateTimeForTest': 1590471479783,
          'homeworkFileBoxId': null,
          'sumViewSeconds': '25',
          'durationViewSeconds': '36',
          'stamped': false,
          'lectureUsid': 'LECTURE-CARD-1zh',
          'serviceType': 'Lecture',
          'phaseCount': 0,
          'completePhaseCount': 0,
          'leaderEmails': null,
          'url': null,
          'enrolledState': null,
          'finishMedia': false,
          'lectureCardUsid': 'LECTURE-CARD-1zh'
        },
        {
          'id': '60bfb66c-2d86-4952-a9d6-0cbe87f45094',
          'entityVersion': 1,
          'patronKey': {
            'keyString': 'r46u@ne1-m2',
            'patronType': 'Denizen',
            'sequenceStringAs36': 'r46u',
            'cineroomKey': false,
            'denizenKey': true,
            'audienceKey': false,
            'pavilionKey': false
          },
          'name': 'SK**',
          'email': 'SKCC.hug01@sk.com\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u000f',
          'company': 'SK주식회사 C&C',
          'department': '공용계정조직',
          'proposalState': 'Approved',
          'learningState': 'Progress',
          'sessionId': null,
          'studentScore': {
            'testScoreList': [],
            'testTotalScore': 0,
            'homeworkScore': 0,
            'numberOfTrials': 0,
            'latestScore': 0,
            'gotEssay': false
          },
          'creationTime': 1592898474138,
          'updateTime': 1592898474144,
          'programLectureUsid': '',
          'courseLectureUsid': '',
          'joinRequests': null,
          'markComplete': false,
          'rollBookId': '4dfa9b07-62db-44e2-a65d-3f3e79e1e5d8',
          'examAttendance': false,
          'updateTimeForTest': 1592898474144,
          'homeworkFileBoxId': null,
          'sumViewSeconds': '15',
          'durationViewSeconds': '45',
          'stamped': false,
          'lectureUsid': 'LECTURE-CARD-1zc',
          'serviceType': 'Lecture',
          'phaseCount': 0,
          'completePhaseCount': 0,
          'leaderEmails': null,
          'url': null,
          'enrolledState': null,
          'finishMedia': false,
          'lectureCardUsid': 'LECTURE-CARD-1zc'
        }
      ]
    }
  ]
};

@autobind
class StudentService {
  //
  static instance: StudentService;

  private studentApi: StudentApi;

  @observable
  _studentInfo: StudentInfoModel | null = null;

  @computed
  get StudentInfos() {
    return this._studentInfo;
  }

  @action
  getStudentInfo(studentId: string) {
    return this._studentInfo ? this._studentInfo.findByLectureUsid(studentId) : null;
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
  async setStudentInfo(serviceId: string, lectureCardIds: string[], courseLectureIds: string[]) {
    const studentInfo = await StudentFlowApi.instance.getLectureStudentView(serviceId, lectureCardIds, courseLectureIds);
    console.log(`studentInfo = ${studentInfo}`);
    this._studentInfo = new StudentInfoModel(studentInfo);
    return this._studentInfo;
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
