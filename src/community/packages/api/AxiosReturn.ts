import { AxiosResponse } from 'axios';

export function AxiosReturn<T>(response: AxiosResponse<T> | undefined) {
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

export function ResultReturn(response: AxiosResponse<ResponseWithResult>) {
  if (
    response === null ||
    response === undefined ||
    response.data === null ||
    (response.data as unknown) === '' ||
    response.data.result === null ||
    response.data.result === undefined ||
    (response.data.result as unknown) === ''
  ) {
    return undefined;
  }
  return response.data.result;
}

export interface ResponseWithResult<T = any> {
  result: T;
}
