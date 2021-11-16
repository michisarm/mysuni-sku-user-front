import { getAxios } from 'shared/api/Axios';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { createCacheApi } from 'lecture/detail/api/cacheableApi';
import { CommunityLectureCard } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';

const base_url = '/api/user';
const BASE_URL = '/api/lecture';

function findInstructorWithIdentity(instructorId: string) {
  const axios = getAxios();
  const url = `${base_url}/instructors/${instructorId}`;
  return axios.get<InstructorWithIdentity>(url).then(AxiosReturn);
}

export const [findInstructorWithIdentityCache] = createCacheApi(
  findInstructorWithIdentity
);

export function findCards(cardIds: string[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/cards/findCards`;
  return axios
    .get<CommunityLectureCard[]>(url, {
      params: {
        ids: cardIds,
      },
      paramsSerializer,
    })
    .then(AxiosReturn);
}
function paramsSerializer(paramObj: Record<string, any>) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    if (paramObj[key] !== undefined) {
      params.append(key, paramObj[key]);
    }
  }
  return params.toString();
}
