import { axiosApi } from '@nara.platform/accent';
import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { findCardListCache } from '../../detail/api/cardApi';
import { Recommendation } from '../model/Recommendation';
import { RecommendationViewModel } from '../viewmodel/RecommendationViewModel';

//대쉬보드 문구
export function getRecentlyStudyChannel() {
  return axiosApi
    .get<any>(`/api/mytraining/mytraining/mytrainings/channel`)
    .then(response => {
      return response && response.data;
    });
}

export async function findRecommendationCards(limit?: number) {
  const axios = getAxios();
  const recommendationUrl = '/api/recommendation/cards';
  const recommendation = await axios
    .get<Recommendation>(recommendationUrl, { params: { limit } })
    .then(AxiosReturn);
  if (recommendation !== undefined) {
    const { created, recTitle } = recommendation;
    const recommendationViewModel: RecommendationViewModel = {
      created,
      recTitle,
      cards: [],
    };
    if (
      Array.isArray(recommendation.cards) &&
      recommendation.cards.length > 0
    ) {
      const cardIds = recommendation.cards.join();
      const cards = await findCardListCache(cardIds);
      if (cards !== undefined) {
        return { ...recommendationViewModel, cards };
      }
    }
    return recommendationViewModel;
  }
}
