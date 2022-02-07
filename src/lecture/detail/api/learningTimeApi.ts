import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import ReplayTimeSdo from '../model/ReplayTimeSdo';

const BASE_URL = '/api/learning/learningTimes';

export function saveReplayTime(replayTimeSdo: ReplayTimeSdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/replay`;
  return axios.post(url, replayTimeSdo).then(AxiosReturn);
}
