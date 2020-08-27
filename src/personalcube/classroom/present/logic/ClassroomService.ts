import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import ClassroomApi from '../apiclient/ClassroomApi';
import ClassroomModel from '../../model/ClassroomModel';
import ClassroomGroupFlowApi from '../apiclient/ClassroomGroupFlowApi';


@autobind
export default class ClassroomService {
  //
  static instance: ClassroomService;

  classroomApi: ClassroomApi;
  classroomGroupFlowApi: ClassroomGroupFlowApi;

  @observable
  classroom: ClassroomModel = new ClassroomModel();

  @observable
  classrooms: ClassroomModel[] = [];

  constructor(classroomApi: ClassroomApi, classroomGroupFlowApi: ClassroomGroupFlowApi) {
    this.classroomApi = classroomApi;
    this.classroomGroupFlowApi = classroomGroupFlowApi;
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
  async findClassrooms(cubeId: string) {
    const classrooms = await this.classroomGroupFlowApi.findClassrooms(cubeId);
    if (classrooms) {
      return runInAction(() => this.classrooms = classrooms.map(classroom => new ClassroomModel(classroom)));
    } else {
      return null;
    }
  }

  @action
  clearClassroom() {
    this.classroom = new ClassroomModel();
  }
}

Object.defineProperty(ClassroomService, 'instance', {
  value: new ClassroomService(ClassroomApi.instance, ClassroomGroupFlowApi.instance),
  writable: false,
  configurable: false,
});
