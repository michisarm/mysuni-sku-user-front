import { axiosApi as axios } from '@nara.platform/accent';
import { ClassroomGroupModel } from '../../model/ClassroomGroupModel';

export default class ClassroomGroupApi {

  URL = '/api/personalCube/classroomgroups';

  static instance: ClassroomGroupApi;

  findClassroomGroup(classroomGroupId: string) {
    //
    return axios.get<ClassroomGroupModel>(this.URL + `/${classroomGroupId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(ClassroomGroupApi, 'instance', {
  value: new ClassroomGroupApi(),
  writable: false,
  configurable: false,
});
