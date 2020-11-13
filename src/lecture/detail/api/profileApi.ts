import { axiosApi } from '@nara.platform/accent';
import Profile from '../model/Profile';

const BASE_URL = '/api/profile';



export function findSkProfileByAudienceId(audienceId: string): Promise<Profile | void> {
  const url = `${BASE_URL}/profiles/byAudienceId?audienceId=${audienceId}`;
  return axiosApi
    .get<Profile>(url)
    .then(response => {
      return response && (response as unknown) != "" ? response.data : undefined
    });
}