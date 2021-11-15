import { createStore } from '../../../../packages/store/createStore';
import { MainMyCommunityPost, MainMyCommunityTab } from '../mycommunity.model';

export const [
  useMainMyCommunityPost,
  setMainMyCommunityPost,
  getMainMyCommunityPost,
  onMainMyCommunityPost,
] = createStore<MainMyCommunityPost>();

export const [
  useMainMyCommunityTab,
  setMainMyCommunityTab,
  getMainMyCommunityTab,
  onMainMyCommunityTab,
] = createStore<MainMyCommunityTab>();
