import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';

const BASE_URL = '/api/approval';
export function findMembersByDenizenKeys(denizenKeys: string[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/members/byDenizenKeys`;
  return axios.post<string[]>(url, denizenKeys).then(AxiosReturn);
}
