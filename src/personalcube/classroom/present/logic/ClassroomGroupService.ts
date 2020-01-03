import { observable, action, runInAction } from 'mobx';
import { autobind } from '@nara.platform/accent';
import ClassroomGroupApi from '../apiclient/ClassroomGroupApi';
import ClassroomGroupFlowApi from '../apiclient/ClassroomGroupFlowApi';
import { ClassroomGroupModel } from '../../model/ClassroomGroupModel';


@autobind
export default class ClassroomGroupService {
  //
  static instance: ClassroomGroupService;

  classroomGroupApi: ClassroomGroupApi;
  classroomGroupFlowApi: ClassroomGroupFlowApi;

  @observable
  classroomGroup: ClassroomGroupModel = new ClassroomGroupModel();

  constructor(classroomGroupApi: ClassroomGroupApi, classroomGroupFlowApi: ClassroomGroupFlowApi) {
    this.classroomGroupApi = classroomGroupApi;
    this.classroomGroupFlowApi = classroomGroupFlowApi;
  }

  @action
  async findClassroomGroup(classroomGroupId: string) {
    const classroomGroup = await this.classroomGroupApi.findClassroomGroup(classroomGroupId);
    runInAction(() => this.classroomGroup = new ClassroomGroupModel(classroomGroup));
  }

  @action
  clearClassroomGroup() {
    this.classroomGroup = new ClassroomGroupModel();
  }
}

Object.defineProperty(ClassroomGroupService, 'instance', {
  value: new ClassroomGroupService(ClassroomGroupApi.instance, ClassroomGroupFlowApi.instance),
  writable: false,
  configurable: false,
});
