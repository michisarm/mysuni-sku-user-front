import { getAxios } from 'shared/api/Axios';
import { PageElement } from '../model/PageElement';
import { CardBundle } from '../model/CardBundle';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { createCacheApi } from '../../detail/api/cacheableApi';

const BASE_URL = '/api/arrange/pageElements';

function findAvailablePageElements() {
  const axios = getAxios();
  const url = `${BASE_URL}/available`;
  return axios.get<PageElement[]>(url).then(AxiosReturn);
}

export const [findAvailablePageElementsCache] = createCacheApi(
  findAvailablePageElements
);

function findAvailableCardBundles() {
  const axios = getAxios();
  const url = '/api/arrange/cardBundles/available';
  return axios.get<CardBundle[]>(url).then(AxiosReturn);
}

export const [findAvailableCardBundlesCache] = createCacheApi(
  findAvailableCardBundles
);
