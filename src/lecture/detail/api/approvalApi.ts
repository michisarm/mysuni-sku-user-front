import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { UserWorkspace } from '../../../approval/models/UserWorkspace';
import { createCacheApi } from './cacheableApi';
import { CompanyApproverModel } from 'approval/company/model/CompanyApproverModel';

const BASE_URL = '/api/approval';
export function findMembersByDenizenKeys(denizenKeys: string[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/members/byDenizenKeys`;
  return axios.post<string[]>(url, denizenKeys).then(AxiosReturn);
}

export function findMembersByDepartmentCode(
  departmentCode: string
): Promise<CompanyApproverModel | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/members/byDepartmentCode`;
  return axios
    .post<CompanyApproverModel>(url, departmentCode)
    .then(AxiosReturn);
}
