import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { CpPisAgreementModel } from '../../model/CpPisAgreementModel';
import { PisAgreementSdo } from '../../model/PisAgreementSdo';

const BASE_URL = '/api/instructor';

export function registerPisAgreement(pisAgreementSdo: PisAgreementSdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/pisAgreements`;
  return axios.post(url, pisAgreementSdo).then(AxiosReturn);
}

export function findMyPisAgreement(agreementFormId: string, serviceId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/pisAgreements/myPisAgreement/${agreementFormId}/${serviceId}`;
  return axios.get<CpPisAgreementModel>(url).then(AxiosReturn);
}
