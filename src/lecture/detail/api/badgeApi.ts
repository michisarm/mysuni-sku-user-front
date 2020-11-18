import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import BadgeModel from '../../../certification/ui/model/BadgeModel';

const BASE_URL = '/api/badge';

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

export function findByLectureUsid(lectureUsid: string): Promise<BadgeModel[] | undefined> {
  const url = `${BASE_URL}/badges/lecture-badges?lectureUsid=${lectureUsid}`;
  return axiosApi
    .get<BadgeModel[]>(url)
    .then(AxiosReturn);
}
