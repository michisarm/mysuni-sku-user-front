import { getAxios } from '../../../../packages/api/getAxios';
import { AxiosReturn } from '../../../../packages/api/AxiosReturn';

const BASE_URL = '/api/community/secretCommunities';

export function existsBySecretCommunity(communityId: string, secret: string) {
  const axios = getAxios();

  const url = `${BASE_URL}/existsByCommunity/${communityId}/${secret}`;

  return axios.get<boolean>(url).then(AxiosReturn);
}
