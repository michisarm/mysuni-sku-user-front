import PlayTimeSdo from '../model/PlayTimeSdo';
import { axiosApi } from '@nara.platform/accent';
import PlayTimeUdo from '../model/PlayTimeUdo';
import PlayTimeModel from '../model/PlayTimeModel';

const BASE_URL = '/api/panopto';

function paramsSerializer(paramObj: Record<string, any>) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
}

//// playTime
export function savePlayTime(playTime: PlayTimeSdo): Promise<number> {
  //
  const url = `${BASE_URL}/playTimes`;
  return axiosApi
    .post(url, playTime)
    .then((response) => (response && response.data) || null);
}

export function modifyPlayTime(playTime: PlayTimeUdo): Promise<void> {
  //
  const url = `${BASE_URL}/playTimes`;
  return axiosApi
    .put(url, playTime)
    .then((response) => (response && response.data) || null);
}

export function findPlayTime(cubeId: string): Promise<number> {
  //
  const url = `${BASE_URL}/playTimes/${cubeId}/playedSeconds`;
  return axiosApi
    .get(url)
    .then((response) => (response && response.data) || null);
}

export function findByCubIds(cubeIds: string[]): Promise<PlayTimeModel[]> {
  //
  const url = `${BASE_URL}/playTimes/findByCubeIds`;
  return axiosApi
    .get(url, { params: cubeIds, paramsSerializer })
    .then((response) => (response && response.data) || null);
}

////watchingVideos

export function start(cubeId: string): Promise<string> {
  //
  const url = `${BASE_URL}/watchingVideos/start`;
  return axiosApi
    .get(url, { params: cubeId, paramsSerializer })
    .then((response) => (response && response.data) || null);
}

export function stop(cubeId: string): Promise<string> {
  //
  const url = `${BASE_URL}/watchingVideos/stop`;
  return axiosApi
    .get(url, { params: cubeId, paramsSerializer })
    .then((response) => (response && response.data) || null);
}
