import { axiosApi as axios } from '@nara.platform/accent';
import { createCacheApi } from 'lecture/detail/api/cacheableApi';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import {
  DepartmentApiModel,
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
        this.rootURL +
          `/byDepartmentCodeAndKeyword?departmentCode=${departmentCode}`
      )
      .then(
        (response) =>
          (response && response.data && new DepartmentModel(response.data)) ||
          new DepartmentModel()
      );
  }
}

export function findMembersByDepartmentCode(
  departmentCode: string,
  keyword?: string
): Promise<DepartmentApiModel[] | undefined> {
  return axios
    .get<DepartmentApiModel[]>(
      `/api/approval/members/byDepartmentCodeAndKeyword?departmentCode=${departmentCode}&keyword=${
        keyword || ''
      }`
    )
    .then(AxiosReturn);
}

export const [
  findMembersByDepartmentCodeCache,
  clearFindMembersByDepartmentCodeCache,
] = createCacheApi(findMembersByDepartmentCode);

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
