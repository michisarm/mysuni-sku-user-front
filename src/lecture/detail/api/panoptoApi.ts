import PlayTimeSdo from '../model/PlayTimeSdo';
import { axiosApi } from '@nara.platform/accent';
import PlayTimeUdo from '../model/PlayTimeUdo';
import PlayTimeModel from '../model/PlayTimeModel';

const BASE_URL = '/api/panopto';

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

export function findByCubeIds(cubeIds: string[]): Promise<PlayTimeModel[]> {
  //
  const url = `${BASE_URL}/playTimes/findByCubeIds`;
  return axiosApi
    .get(url, {
      params: cubeIds,
      paramsSerializer: (paramObj) => {
        const params = new URLSearchParams();
        paramObj.forEach((param: any) => params.append('cubeIds', param));
        return params.toString();
      },
    })
    .then((response) => (response && response.data) || null);
}

////watchingVideos

export function start(cubeId: string): Promise<string> {
  //
  const url = `${BASE_URL}/watchingVideos/start?cubeId=${cubeId}`;
  return axiosApi
    .get(url)
    .then((response) => (response && response.data) || null);
}

export function stop(): Promise<string> {
  //
  const url = `${BASE_URL}/watchingVideos/stop`;
  return axiosApi
    .get(url)
    .then((response) => (response && response.data) || null);
}
