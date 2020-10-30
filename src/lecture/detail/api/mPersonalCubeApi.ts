import { axiosApi } from '@nara.platform/accent';
import CubeIntro from '../model/CubeIntro';
import OfficeWeb from '../model/OfficeWeb';
import PersonalCube from '../model/PersonalCube';

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

export function findOfficeWeb(officeWebId: string) {
  const url = `${BASE_URL}/officewebs/${officeWebId}`;
  return axiosApi
    .get<OfficeWeb>(url)
    .then(response => response && response.data);
}
