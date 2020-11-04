import { axiosApi } from '@nara.platform/accent';
import CoursePlan from '../model/CoursePlan';

const BASE_URL = '/api/course';

export function findCoursePlan(coursePlanId: string): Promise<CoursePlan> {
  const url = `${BASE_URL}/coursePlans/${coursePlanId}`;
  return axiosApi
    .get<CoursePlan>(url)
    .then(response => response && response.data);
}
