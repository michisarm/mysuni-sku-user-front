import { getAxios } from 'shared/api/Axios';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { createCacheApi } from 'lecture/detail/api/cacheableApi';

const base_url = '/api/user';

function findInstructorWithIdentity(instructorId: string) {
  const axios = getAxios();
  const url = `${base_url}/instructors/${instructorId}`;
  return axios.get<InstructorWithIdentity>(url).then(AxiosReturn);
}

export const [findInstructorWithIdentityCache] = createCacheApi(
  findInstructorWithIdentity
);
