import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import CoursePlan from '../model/CoursePlan';
import CoursePlanContents from '../model/CoursePlanContents';

const BASE_URL = '/api/course';

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


export function findCoursePlan(coursePlanId: string): Promise<CoursePlan | undefined> {
  const url = `${BASE_URL}/coursePlans/${coursePlanId}`;
  return axiosApi
    .get<CoursePlan>(url)
    .then(AxiosReturn);
}

export function findCoursePlanContents(contentsId: string): Promise<CoursePlanContents | undefined> {
  const url = `${BASE_URL}/coursePlanContents/${contentsId}`;
  return axiosApi
    .get<CoursePlanContents>(url)
    .then(AxiosReturn);
}
