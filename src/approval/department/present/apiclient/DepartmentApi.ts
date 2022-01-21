import { axiosApi as axios } from '@nara.platform/accent';
import { createCacheApi } from 'lecture/detail/api/cacheableApi';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import {
  DepartmentChartModel,
  DepartmentModel,
} from '../../model/DepartmentModel';

export default class DepartmentApi {
  //
  rootURL = '/api/approval/departments';

  static instance: DepartmentApi;

  findDepartmentByCode(departmentCode: string) {
    //
    return axios
      .get<DepartmentModel>(
        this.rootURL + `/byDepartmentCode?code=${departmentCode}`
      )
      .then(
        (response) =>
          (response && response.data && new DepartmentModel(response.data)) ||
          new DepartmentModel()
      );
  }
}

export function retrieveDepartments(chartId: string) {
  return axios
    .get<DepartmentChartModel[]>(
      `/api/approval/departments/byChartId?chartId=${chartId}`
    )
    .then(AxiosReturn);
}

export const [retrieveDepartmentsCache, clearRetrieveDepartmentsCache] =
  createCacheApi(retrieveDepartments);

Object.defineProperty(DepartmentApi, 'instance', {
  value: new DepartmentApi(),
  writable: false,
  configurable: false,
});
