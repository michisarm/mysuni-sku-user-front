import { axiosApi } from '@nara.platform/accent';
import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Agreement } from '../model/Agreement';
import Profile from '../model/Profile';

const BASE_URL = '/api/profile';

export function findSkProfileByAudienceId(
  audienceId: string
): Promise<Profile | void> {
  const url = `${BASE_URL}/profiles/byAudienceId?audienceId=${audienceId}`;
  return axiosApi.get<Profile>(url).then((response) => {
    return response && (response as unknown) != '' ? response.data : undefined;
  });
}

export function generationEncryptKey(
  cubeId: string,
  cardId: string
): Promise<String | void> {
  const url = `${BASE_URL}/profiles/encryptKey?cubeId=${cubeId}&cardId=${cardId}`;
  return axiosApi.get<String>(url).then((response) => {
    return response && (response as unknown) != '' ? response.data : undefined;
  });
}

export function findAgreement(
  organizedId: string
): Promise<Agreement | undefined> {
  const axios = getAxios();
  // 동의서 ID는 해당 동의서가 만들어진 날짜
  // 날짜 뒤 숫자는 동의서의 버전, 동의서가 수정될 때 마다 버전을 하나씩 올려준다.
  const agreementFormId = '20210622-1';
  const url = `${BASE_URL}/pisAgreements/myPisAgreement/${agreementFormId}/${organizedId}`;

  return axios.get(url).then(AxiosReturn);
}

export function updateAgreement(
  serviceId: string,
  optionalAgreements: boolean[]
): Promise<void> {
  const axios = getAxios();
  const url = `${BASE_URL}/pisAgreements`;

  const params = {
    agreementFormId: '20210622-1',
    serviceId,
    optionalAgreements,
  };

  return axios.post(url, params).then(AxiosReturn);
}
