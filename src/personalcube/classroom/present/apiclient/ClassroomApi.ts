import { axiosApi as axios } from '@nara.platform/accent';
import { ClassroomModel } from '../../model/ClassroomModel';

export default class ClassroomApi {
  URL = '/api/personalCube/classrooms';

  static instance: ClassroomApi;

  findClassroom(classroomId: string) {
    //
    return axios.get<ClassroomModel>(this.URL + `/${classroomId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(ClassroomApi, 'instance', {
  value: new ClassroomApi(),
  writable: false,
  configurable: false,
});
