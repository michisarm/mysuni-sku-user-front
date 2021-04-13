import { createStore } from '../../../shared/store/Store';
import { RecommendCardRom } from '../../model/RecommendCardRom';

export const [
  setRecommendCardRoms,
  onRecommendCardRoms,
  getRecommendCardRoms,
  useRecommendCardRoms,
] = createStore<RecommendCardRom[]>();
