import { axiosApi } from '@nara.platform/accent';
import { UserWorkspace } from 'approval/models/UserWorkspace';
import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { Agreement } from '../model/Agreement';
import Profile from '../model/Profile';
import { createCacheApi } from './cacheableApi';

const BASE_URL = '/api/user/users';

export function findSkProfileByAudienceId(
  audienceId: string
): Promise<Profile | void> {
  return axiosApi.get<Profile>(BASE_URL).then((response) => {
    return response && (response as unknown) != '' ? response.data : undefined;
  });
}

export function generationEncryptKey(
  cubeId: string,
  cardId: string
): Promise<String | void> {
  // 0818 긴급 배포로 api 수정, 이후 다시 원복 예정
  // const url = `${BASE_URL}/encryptKey?cubeId=${cubeId}&cardId=${cardId}`;
  const url = `/api/user/encryption/encryptionKey?cubeId=${cubeId}&cardId=${cardId}`;
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
  const url = `${BASE_URL}/pisAgreement/my?agreementFormId=${agreementFormId}&serviceId=${organizedId}`;

  return axios.get(url).then(AxiosReturn);
}

export function updateAgreement(
  serviceId: string,
  optionalAgreements: boolean[]
): Promise<void> {
  const axios = getAxios();
  const url = `${BASE_URL}/pisAgreement`;

  const params = {
    agreementFormId: '20210622-1',
    serviceId,
    optionalAgreements,
  };

  return axios.post(url, params).then(AxiosReturn);
}

export function findCardPisAgreement(agreementFormId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/pisAgreement/my`;

  const params = {
    agreementFormId,
    serviceId: 'CARD',
  };

  return axios.get(url, { params }).then(AxiosReturn);
}

export function updateCardPisAgreement(
  agreementFormId: string,
  optionalAgreements: boolean[]
) {
  const axios = getAxios();
  const url = `${BASE_URL}/pisAgreement`;

  const params = {
    agreementFormId,
    serviceId: 'CARD',
    optionalAgreements,
  };

  return axios.post(url, params).then(AxiosReturn);
}

export function findMyUserWorkspace() {
  const axios = getAxios();
  const url = '/api/user/userWorkspaces/my';
  return axios.get<UserWorkspace>(url).then(AxiosReturn);
}

export const [
  findMyUserWorkspaceCache,
  clearFindMyUserWorkspaceCache,
] = createCacheApi(findMyUserWorkspace);
