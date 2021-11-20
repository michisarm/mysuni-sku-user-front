import { axiosApi } from '@nara.platform/accent';
import { getAxios } from '../../../shared/api/Axios';
import { AxiosReturn } from '../../../shared/api/AxiosReturn';
import { findCardsWithoutLearningExperience } from '../../detail/api/cardApi';
import { Recommendation } from '../model/Recommendation';
import { RecommendationViewModel } from '../viewmodel/RecommendationViewModel';
import { RecommendationType } from '../model/RecommendationType';

//대쉬보드 문구
export function getRecentlyStudyChannel() {
  return axiosApi
    .get<any>(`/api/mytraining/mytraining/mytrainings/channel`)
    .then((response) => {
      return response && response.data;
    });
}

export async function findRecommendationCardsFromContentBase() {
  const axios = getAxios();
  const recommendationUrl = '/api/lrs/cardRecommendation/cards';
  const contentsBasedType: RecommendationType = 'ContentsBased';
  const recommendation = await axios
    .get<Recommendation>(recommendationUrl, {
      params: { Type: contentsBasedType },
    })
    .then(AxiosReturn);
  if (recommendation !== undefined) {
    const { recTitle } = recommendation;
    const recommendationViewModel: RecommendationViewModel = {
      recTitle,
      cards: [],
    };
    if (
      Array.isArray(recommendation.cards) &&
      recommendation.cards.length > 0
    ) {
      const cardIds = recommendation.cards.join();
      const cards = await findCardsWithoutLearningExperience(cardIds);
      if (cards !== undefined) {
        return { ...recommendationViewModel, cards };
      }
    }
    return recommendationViewModel;
  }
}

export async function findRecommendationCardsFromLearningPatternBased() {
  const axios = getAxios();
  const recommendationUrl = '/api/lrs/cardRecommendation/cards';
  const contentsBasedType: RecommendationType = 'LearningPatternBased';
  const recommendation = await axios
    .get<Recommendation>(recommendationUrl, {
      params: { Type: contentsBasedType },
    })
    .then(AxiosReturn);
  if (recommendation !== undefined) {
    const { recTitle } = recommendation;
    const recommendationViewModel: RecommendationViewModel = {
      recTitle,
      cards: [],
    };
    if (
      Array.isArray(recommendation.cards) &&
      recommendation.cards.length > 0
    ) {
      const cardIds = recommendation.cards.join();
      const cards = await findCardsWithoutLearningExperience(cardIds);
      if (cards !== undefined) {
        return { ...recommendationViewModel, cards };
      }
    }
    return recommendationViewModel;
  }
}
