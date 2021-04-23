import { axiosApi } from '@nara.platform/accent';
import { AxiosResponse } from 'axios';
import { BadgeBundle } from '../../../certification/model/Badge';

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

export function findByLectureUsid(
  lectureUsid: string
): Promise<BadgeBundle[] | undefined> {
  const url = `${BASE_URL}/badges/byCardId`;

  return axiosApi
    .get<BadgeBundle[]>(url, { params: { cardId: lectureUsid } })
    .then(AxiosReturn);
}
