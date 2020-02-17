import autobind from 'autobind-decorator';
import { action, observable, runInAction } from 'mobx';
import DepartmentApi from '../apiclient/DepartmentApi';
import { DepartmentModel } from '../../model/DepartmentModel';

@autobind
export default class DepartmentService {
  //
  static instance: DepartmentService;

  departmentApi: DepartmentApi;

  @observable
  department: DepartmentModel = new DepartmentModel();

  constructor(departmentApi: DepartmentApi) {
    //
    this.departmentApi = departmentApi;
  }

  @action
  async findDepartmentByCode(departmentCode: string) {
    //
    const department = await this.departmentApi.findDepartmentByCode(departmentCode);

    runInAction(() => this.department = department);
    return department;
  }
}

Object.defineProperty(DepartmentService, 'instance', {
  value: new DepartmentService(DepartmentApi.instance),
  writable: false,
  configurable: false,
});
