import { observable, action, runInAction } from 'mobx';
import autobind from 'autobind-decorator';
import ClassroomApi from '../apiclient/ClassroomApi';
import { ClassroomModel } from '../../model/ClassroomModel';


@autobind
export default class ClassroomService {
  //
  static instance: ClassroomService;

  classroomApi: ClassroomApi;

  @observable
  classroom: ClassroomModel = new ClassroomModel();

  constructor(classroomApi: ClassroomApi) {
    this.classroomApi = classroomApi;
  }

  @action
  async findClassroom(classroomId: string) {
    const classroom = await this.classroomApi.findClassroom(classroomId);

    if (!classroom) {
      return null;
    }
    return runInAction(() => this.classroom = new ClassroomModel(classroom));
  }

  @action
  clearClassroom() {
    this.classroom = new ClassroomModel();
  }
}

Object.defineProperty(ClassroomService, 'instance', {
  value: new ClassroomService(ClassroomApi.instance),
  writable: false,
  configurable: false,
});
