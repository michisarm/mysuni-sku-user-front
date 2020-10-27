// http://localhost:3000/api/personalCube/personalcubes/CUBE-2jq
/**
 * category - Breadcrumb 영역 채널 / 카테고리
 * name - 이름
 * iconBox - 아이콘
 * subCategory - 관련 Category
 * tags - 태그
 * contents - type 에 따라서 content 표시
 */

import { axiosApi } from '@nara.platform/accent';
import CubeIntro from '../model/CubeIntro';
import PersonalCube from '../model/PersonalCube';
import Transcript from '../model/Transcript';

const BASE_URL = '/api/personalCube';

export function findPersonalCube(
  personalCubeId: string
): Promise<PersonalCube> {
  const url = `${BASE_URL}/personalcubes/${personalCubeId}`;
  return axiosApi
    .get<PersonalCube>(url)
    .then(response => response && response.data);
}

export function findCubeIntro(cubeIntroId: string): Promise<CubeIntro> {
  const url = `${BASE_URL}/cubeintros/${cubeIntroId}`;
  return axiosApi
    .get<CubeIntro>(url)
    .then(response => response && response.data);
}

export function findAllTranscript(deliveryId: string, locale: string) {
  return axiosApi
    .get<Transcript[]>(`${BASE_URL}/${deliveryId}/${locale}`)
    .then(response => response && response.data);
}
