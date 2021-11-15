import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { getAxios } from '../../../../packages/api/getAxios';
import { CpPisAgreement } from '../models/CpPisAgreement';

const BASE_URL = '/api/user/users/pisAgreement';

export function findMyPisAgreement(agreementFormId: string, serviceId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/my?agreementFormId=${agreementFormId}&serviceId=${serviceId}`;
  return axios.get<CpPisAgreement>(url).then(AxiosReturn);
}
