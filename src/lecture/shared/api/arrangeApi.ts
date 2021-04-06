import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { createCacheApi } from '../../detail/api/cacheableApi';
import { PageElement } from '../model/PageElement';
import { CardBundle } from '../model/CardBundle';

const BASE_URL = '/api/arrange/pageElements';
function findAvailablePageElements() {
  const axios = getAxios();
  const url = `${BASE_URL}/avaliable`;
  return axios
    .get<PageElement[]>(url)
    .then(response => (response && response.data) || null);
}

export function findAvailableCardBundles() {
  const axios = getAxios();
  const url = '/api/arrange/cardBundles/available';
  return axios
    .get<CardBundle[]>(url)
    .then(response => (response && response.data) || null);
}
export default findAvailablePageElements;
