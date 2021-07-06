import { createStore } from '../../../../shared/store/Store';
import { TopBannerViewModel } from '../viewmodel/TopBannerViewModel';

export const [
  setTopBannerViewModel,
  onTopBannerViewModel,
  getTopBannerViewModel,
  useTopBannerViewModel,
] = createStore<TopBannerViewModel>();
