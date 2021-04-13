import { createStore } from '../../../shared/store/Store';
import { RecommendPageViewModel } from '../viewmodel/RecommendPageViewModel';

export const [
  setRecommendPage,
  onRecommendPage,
  getRecommendPage,
  useRecommendPage,
] = createStore<RecommendPageViewModel>({
  allChannelSelected: true,
  allChannelPage: 1,
  allChannelTotalCount: 0,
  allChannelLoading: false,
});
