import { AxiosReturn } from '../../../../packages/api/AxiosReturn';
import { getAxios } from '../../../../packages/api/getAxios';
import { CpPisAgreement } from '../../profile/models/CpPisAgreement';

const BASE_URL = '/api/user';

export function findInternalPisAgreement(
  agreementFormId: string,
  serviceId: string
) {
  const axios = getAxios();
  const url = `${BASE_URL}/users/pisAgreement/my?agreementFormId=${agreementFormId}&serviceId=${serviceId}`;

  return axios
    .get<CpPisAgreement>(url)
    .then(AxiosReturn)
    .catch((error) => {
      if (error.response.status === 401) {
        window.location.href = `${window.location.protocol}//${window.location.host}/login`;
        return undefined;
      }
      return undefined;
    });
}
