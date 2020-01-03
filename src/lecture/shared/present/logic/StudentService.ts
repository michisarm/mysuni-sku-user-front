
import { observable, action, computed, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import StudentApi from '../apiclient/StudentApi';
import StudentCdoModel from '../../model/StudentCdoModel';
import StudentJoinRdoModel from '../../model/StudentJoinRdoModel';
import StudentCountRdoModel from '../../model/StudentCountRdoModel';


@autobind
class StudentService {
  //
  static instance: StudentService;

  private studentApi: StudentApi;

  @observable
  studentCountMap: Map<string, StudentCountRdoModel> = new Map();

  @observable
  _studentJoins: StudentJoinRdoModel[] = [];


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
    const studentJoins = this._studentJoins as any;
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

  @action
  async findStudentCount(rollBookId: string) {
    //
    const studentCountRdo = await this.studentApi.findStudentCount(rollBookId);

    return runInAction(() => {
      this.studentCountMap.set(rollBookId, new StudentCountRdoModel(studentCountRdo));
      return studentCountRdo;
    });
  }

  @action
  async findIsJsonStudent(lectureCardId: string) {
    //
    const studentJoinRdos = await this.studentApi.findIsJsonStudent(lectureCardId);
    return runInAction(() => {
      this._studentJoins = studentJoinRdos.map(studentJoinRdo => new StudentJoinRdoModel(studentJoinRdo));
      return studentJoinRdos;
    });
  }
}

StudentService.instance = new StudentService(StudentApi.instance);

export default StudentService;
