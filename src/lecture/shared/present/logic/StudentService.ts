
import { observable, action, computed, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
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
  _studentCounts: StudentCountRdoModel[] = [];

  @observable
  _studentJoins: StudentJoinRdoModel[] = [];


  constructor(studentApi: StudentApi) {
    this.studentApi = studentApi;
  }

  @computed
  get studentCounts() {
    //
    const studentCounts = this._studentCounts as any;
    return studentCounts.peek();
  }

  @computed
  get studentJoins() {
    //
    const studentJoins = this._studentJoins as any;
    return studentJoins.peek().filter((studentJoin: StudentJoinRdoModel) => studentJoin.join);
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

  @action
  async findStudentCount(rollBookId: string) {
    //
    const studentCountRdo = await this.studentApi.findStudentCount(rollBookId);

    return runInAction(() => {
      this._studentCounts.push(new StudentCountRdoModel(studentCountRdo));
      return studentCountRdo;
    });
  }

  @action
  async findIsJsonStudent(lectureCardId: string) {
    //
    const studentJoinRdos = await this.studentApi.findIsJsonStudent(lectureCardId);
    // console.log(studentJoinRdos);
    // return runInAction(() => {
    //   this._studentJoins = studentJoinRdos.map(studentJoinRdo => new StudentJoinRdoModel(studentJoinRdo));
    //   return studentJoinRdos;
    // });
  }

  @action
  clearCounts() {
    this._studentCounts = [];
  }
}

StudentService.instance = new StudentService(StudentApi.instance);

export default StudentService;
