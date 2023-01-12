import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import {
  Result,
  Abtest,
  AbtestResult,
  AbtestResultModel,
  AbtestResultModifyModel,
} from 'abtest/model/Abtest';

// const BASE_URL = '/api/data-foundation/abtest';
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

export function getUserTargets(): Promise<Abtest[] | undefined> {
  const url = `${BASE_URL}/userTarget`;
  return axiosApi.get<Abtest[]>(url).then(AxiosReturn);
}

export function registerAbtestResult(
  abtestResultModel: AbtestResultModel
): Promise<AbtestResult | undefined> {
  const url = `${BASE_URL}/result`;
  return axiosApi.post<AbtestResult>(url, abtestResultModel).then(AxiosReturn);
}

export function modifyAbtestResult(
  abtestResultId: string,
  abtestResultModifyModel: AbtestResultModifyModel
): Promise<Result | undefined> {
  const url = `${BASE_URL}/result/${abtestResultId}`;
  return axiosApi.put<Result>(url, abtestResultModifyModel).then(AxiosReturn);
}
