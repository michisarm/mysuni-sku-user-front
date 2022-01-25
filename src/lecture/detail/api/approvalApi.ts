import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Company } from '../model/Company';
import { MemberByDepartmentCode } from '../model/MemberByDepartmentCode';
import { createCacheApi } from './cacheableApi';

const BASE_URL = '/api/approval';
export function findMembersByDenizenKeys(denizenKeys: string[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/members/byDenizenKeys`;
  return axios.post<string[]>(url, denizenKeys).then(AxiosReturn);
}

// export function findMembersByDepartmentCode(
//   departmentCode: string
// ): Promise<MemberByDepartmentCode[] | undefined> {
//   const axios = getAxios();
//   const url = `${BASE_URL}/members/byDepartmentCode?departmentCode=${departmentCode}`;
//   return axios.get<MemberByDepartmentCode[]>(url).then(AxiosReturn);
// }

// export const [
//   findMembersByDepartmentCodeCache,
//   clearFindMembersByDepartmentCodeCache,
// ] = createCacheApi(findMembersByDepartmentCode);

export function findDefaultIndexByDepartmentCode(departmentCode: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/orgcharts/departmentsAndDefaultIndexByDepartmentCode?departmentCode=${departmentCode}`;
  return axios.get<{ [key: string]: number }>(url).then(AxiosReturn);
}

export const [
  findDefaultIndexByDepartmentCodeCache,
  clearFindDefaultIndexByDepartmentCodeCache,
] = createCacheApi(findDefaultIndexByDepartmentCode);

export function findCompany(companyCode: string): Promise<Company | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/companies/${companyCode}`;
  return axios.get<Company>(url).then(AxiosReturn);
}

export const [findCompanyCahche, clearFindCompanyCache] =
  createCacheApi(findCompany);
