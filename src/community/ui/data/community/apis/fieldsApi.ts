import { getAxios } from '../../../../packages/api/getAxios';
import Field from '../models/Field';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';

const BASE_URL = '/api/community/fields';

export function findAllFields() {
  const axios = getAxios();

  const url = `${BASE_URL}`;
  return axios.get<Field[]>(url).then(AxiosReturn);
}
