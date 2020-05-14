
import { axiosApi as axios } from '@nara.platform/accent';
import { ClassroomModel } from '../../model';


export default class ClassroomGroupFlowApi {

  URL = '/api/personalCube/classroomgroups/flow/classroomview';

  static instance: ClassroomGroupFlowApi;

  findClassrooms(cubeId: string) {
    //
    return axios.get<ClassroomModel[]>(this.URL + `/${cubeId}`)
      .then(response => response && response.data || null);
  }
}

Object.defineProperty(ClassroomGroupFlowApi, 'instance', {
  value: new ClassroomGroupFlowApi(),
  writable: false,
  configurable: false,
});
