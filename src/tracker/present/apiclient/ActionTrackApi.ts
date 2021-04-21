import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import {
  ActionTrackModel,
  ActionTrackViewModel,
} from 'tracker/model/ActionTrackModel';

// const BASE_URL = '/api/action-log-collector';
const BASE_URL = '/local';

function AxiosReturn<T>(response: AxiosResponse<T>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    response.data === null ||
    (response.data as unknown) === ''
  ) {
    return undefined;
  }
  return response.data;
}

export function trackAction(actionTrackModel: ActionTrackModel) {
  const url = `${BASE_URL}/track/action`;
  return axiosApi.post<string>(url, actionTrackModel).then(AxiosReturn);
}

export function trackView(actionTrackModel: ActionTrackViewModel) {
  const url = `${BASE_URL}/track/view`;
  return axiosApi.post<string>(url, actionTrackModel).then(AxiosReturn);
}
