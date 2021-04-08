import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { CollegeLectureCountRdo } from '../../lecture/model';

const BASE_URL = '/api/college';

export function findAvailableColleges() {
  const axios = getAxios();
  const url = `${BASE_URL}/colleges/available`;
  return axios.get<CollegeLectureCountRdo[]>(url).then(AxiosReturn);
}
