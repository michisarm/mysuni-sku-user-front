import { axiosApi } from "@nara.platform/accent";
import { AxiosResponse } from "axios";

const BASE_URL = '/api/lecture';

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

export function checkStudentByCoursePlanId(
  coursePlanId: string
): Promise<boolean | undefined> {
  const url = `${BASE_URL}/students/flow/checkStudentByCoursePlanId/${coursePlanId}`
  return axiosApi.get<boolean>(url).then(AxiosReturn);
}

export function findlinkUrl(
  coursePlanId: string
): Promise<string | undefined> {
  const url = `${BASE_URL}/coursePlan/linkUrl/${coursePlanId}`
  return axiosApi.get<string>(url).then(AxiosReturn);
}