import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import ReplayTimeCdo from '../model/ReplayTimeCdo';

const BASE_URL = '/api/learning/learningTimes';

export function saveReplayTime(replayTimeCdo: ReplayTimeCdo) {
  const axios = getAxios();
  const url = `${BASE_URL}/replay`;
  return axios.post(url, replayTimeCdo).then(AxiosReturn);
}
