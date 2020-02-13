import { axiosApi as axios } from '@nara.platform/accent';
import { DepartmentModel } from '../../model/DepartmentModel';

export default class DepartmentApi {
  //
  rootURL = '/api/approval/departments';

  static instance: DepartmentApi;

  findDepartmentByCode(departmentCode: string) {
    //
    return axios.get<DepartmentModel>(this.rootURL + `/departmentCode?code=${departmentCode}`)
      .then((response) => response && response.data && new DepartmentModel(response.data) || new DepartmentModel());
  }
}

Object.defineProperty(DepartmentApi, 'instance', {
  value: new DepartmentApi(),
  writable: false,
  configurable: false,
});
