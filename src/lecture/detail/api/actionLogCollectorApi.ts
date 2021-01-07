import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import { StudyEvent } from '../model/StudyEvent';

const BASE_URL = '/api/action-log-collector';

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

export function createStudyLog(studyEvent: StudyEvent) {
  const url = `${BASE_URL}/events/study`;
  return axiosApi.post<void>(url, studyEvent).then(AxiosReturn);
}

export function createViewLog(studyEvent: StudyEvent) {
  const url = `${BASE_URL}/events/view`;
  return axiosApi.post<void>(url, studyEvent).then(AxiosReturn);
}
