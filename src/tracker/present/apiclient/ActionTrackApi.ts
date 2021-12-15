import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import { utf8_to_b64 } from 'tracker-react/utils';
import {
  ActionTrackModel,
  ActionTrackViewModel,
  ActionLog,
} from 'tracker/model/ActionTrackModel';

const BASE_URL = '/api/data-foundation/actionLog';
// const BASE_URL = '/local';

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
  actionTrackModel.context.email = utf8_to_b64(actionTrackModel.context.email);
  const url = `${BASE_URL}/track/action`;
  return axiosApi.post<string>(url, actionTrackModel).then(AxiosReturn);
}

export function trackView(actionTrackModel: ActionTrackViewModel) {
  actionTrackModel.context.email = utf8_to_b64(actionTrackModel.context.email);
  const url = `${BASE_URL}/track/view`;
  return axiosApi.post<string>(url, actionTrackModel).then(AxiosReturn);
}

export function trackLog(log: ActionLog) {
  const url = `${BASE_URL}/track/log`;
  return axiosApi.post<string>(url, log).then(AxiosReturn);
}
