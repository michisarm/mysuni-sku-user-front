import { getAxios } from '../../../../shared/api/Axios';
import { OffsetElementList } from '../../../../shared/model';
import { AxiosReturn } from '../../../../shared/api/AxiosReturn';
import { UserCubeRdo } from '../../model/UserCubeRdo';
import { CreateCube } from '../../../create/model/CreateCube';
import { CreateCubeDetail } from '../../../create/model/CreateCubeDetail';
import { CubeSdo } from '../../../create/model/CubeSdo';
import { ContentsProvider } from '../../model/ContentsProvider';
import { PanoptoCdoModel } from '../../../media/model/PanoptoCdoModel';
import { InternalMediaConnection } from '../../../../lecture/model/InternalMediaConnection';
import { UserCube } from '../../../create/model/UserCube';

const BASE_URL = '/api/cube';

function paramsSerializer(paramObj: Record<string, any>) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
}

export function findCubeDetail(cubeId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/cubes/${cubeId}/detail`;
  return axios.get<CreateCubeDetail>(url).then(AxiosReturn);
}

export function findUserCube(cubeId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/userCubes/${cubeId}`;
  return axios.get<UserCube>(url).then(AxiosReturn);
}

export function findUserCubes(userCubeRdo: UserCubeRdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/userCubes`;

  return axios
    .get<OffsetElementList<CreateCube>>(url, {
      params: userCubeRdo,
      paramsSerializer,
    })
    .then(AxiosReturn);
}

export function registerUserCube(
  cubeSdo: CubeSdo
): Promise<string | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/userCubes`;
  return axios
    .post<string | undefined>(url, cubeSdo)
    .then(AxiosReturn)
    .catch(err => undefined);
}

export function modifyUserCube(
  cubeId: string,
  cubeSdo: CubeSdo
): Promise<boolean> {
  const axios = getAxios();
  const url = `${BASE_URL}/userCubes/${cubeId}`;
  return axios
    .put<void>(url, cubeSdo)
    .then(result => true)
    .catch(error => false);
}

export function removeUserCube(cubeId: string): Promise<boolean> {
  const axios = getAxios();
  const url = `${BASE_URL}/userCubes/${cubeId}`;
  return axios.delete<void>(url).then(result => true).catch(error => false);
}

export function findContentsProviders() {
  const axios = getAxios();
  const url = `${BASE_URL}/contentsProviders`;
  return axios.get<ContentsProvider[]>(url).then(AxiosReturn);
}

export function findPanopToList(panoptoCdo: PanoptoCdoModel) {
  const axios = getAxios();

  const baseUrl = `${BASE_URL}/medias/panoptos`;
  return axios
    .get<OffsetElementList<InternalMediaConnection>>(baseUrl, {
      params: panoptoCdo,
    })
    .then(response => (response && response.data) || null);
}

export function requestOpenUserCube(cubeId: string) {
  const axios = getAxios();
  const baseUrl = `${BASE_URL}/userCubes/${cubeId}/requestOpen`;
  return axios.put<void>(baseUrl).then(response => true).catch(error => false);
}