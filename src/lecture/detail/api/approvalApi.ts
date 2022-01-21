import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { MemberByDepartmentCode } from '../model/MemberByDepartmentCode';
import { createCacheApi } from './cacheableApi';

const BASE_URL = '/api/approval';
export function findMembersByDenizenKeys(denizenKeys: string[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/members/byDenizenKeys`;
  return axios.post<string[]>(url, denizenKeys).then(AxiosReturn);
}

export function findMembersByDepartmentCode(
  departmentCode: string
): Promise<MemberByDepartmentCode[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/members/byDepartmentCode?departmentCode=${departmentCode}`;
  return axios.get<MemberByDepartmentCode[]>(url).then(AxiosReturn);
}

export const [
  findMembersByDepartmentCodeCache,
  clearfindMembersByDepartmentCodeCache,
] = createCacheApi(findMembersByDepartmentCode);

export function findDefaultIndexByDepartmentCode(departmentCode: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/orgcharts/departmentsAndDefaultIndexByDepartmentCode?departmentCode=${departmentCode}`;
  return axios.get<{ [key: string]: number }>(url).then(AxiosReturn);
}
