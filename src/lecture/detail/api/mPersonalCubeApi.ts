import { axiosApi } from '@nara.platform/accent';
import RemoteClassroom from '../model/RemoteClassroom';
import CubeIntro from '../model/CubeIntro';
import Media from '../model/Media';
import OfficeWeb from '../model/OfficeWeb';
import PersonalCube from '../model/PersonalCube';
import Transcript from '../model/Transcript';
import { ClassroomModel } from '../../../personalcube/classroom/model';

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
    .get<Transcript[]>(`${BASE_URL}/transcripts/${deliveryId}/${locale}`)
    .then(response => response && response.data);
}

export function findMedia(mediaId: string) {
  return axiosApi
    .get<Media>(`${BASE_URL}/medias/${mediaId}`)
    .then(response => response && response.data);
}

export function findOfficeWeb(officeWebId: string) {
  const url = `${BASE_URL}/officewebs/${officeWebId}`;
  return axiosApi
    .get<OfficeWeb>(url)
    .then(response => response && response.data);
}

export function findClassrooms(cubeId: string) {
  const url = `${BASE_URL}/classroomgroups/flow/classroomview/${cubeId}`;
  return axiosApi
    .get<ClassroomModel[]>(url)
    .then(response => response && response.data);
}
