import { axiosApi } from '@nara.platform/accent';
import { CardBundleCard } from 'hotTopic/model/HotTopicModel';

const BASE_URL = '/api/lecture';

export function findCardFromCardBundle(cardIds: string[]) {
  const url = `${BASE_URL}/cards/findCardWithPhaseCountForUserViewRdos`;
  const splitedIds = (cardIds && cardIds.join(',')) || '';

  return axiosApi
    .get<CardBundleCard[]>(url, {
      params: {
        ids: splitedIds,
      },
    })
    .then((response) => response && response.data);
}
