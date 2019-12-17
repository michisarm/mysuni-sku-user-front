// import { axiosApi as axios } from '@nara.platform/accent';

export default class ClassroomGroupFlowApi {
  URL = '/api/personalCube/classroomGroups/flow';

  static instance: ClassroomGroupFlowApi;

}

Object.defineProperty(ClassroomGroupFlowApi, 'instance', {
  value: new ClassroomGroupFlowApi(),
  writable: false,
  configurable: false,
});
