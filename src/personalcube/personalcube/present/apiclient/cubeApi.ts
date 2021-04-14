import { getAxios } from "../../../../shared/api/Axios";
import { OffsetElementList } from "../../../../shared/model";
import { AxiosReturn } from "../../../../shared/api/AxiosReturn";
import { UserCubeRdo } from "../../model/UserCubeRdo";
import { CreateCube } from "../../../create/model/CreateCube";
import { CreateCubeDetail } from "../../../create/model/CreateCubeDetail";

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

export function findUserCubes(userCubeRdo: UserCubeRdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/userCubes`

  return axios.get<OffsetElementList<CreateCube>>(url, {
    params: userCubeRdo,
    paramsSerializer
  }).then(AxiosReturn);
}

export function registerUserCube() {
  const axios = getAxios();
  const url = `${BASE_URL}/userCubes`;
}