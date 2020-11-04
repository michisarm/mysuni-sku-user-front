import { axiosApi } from '@nara.platform/accent';
import BadgeModel from '../../../certification/ui/model/BadgeModel';

const BASE_URL = '/api/badge';

export function findByLectureUsid(lectureUsid: string): Promise<BadgeModel[]> {
  const url = `${BASE_URL}/badges/lectuer-badges?lectureUsid=${lectureUsid}`;
  return axiosApi
    .get<BadgeModel[]>(url)
    .then(response => response && response.data);
}
