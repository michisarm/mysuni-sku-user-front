import { createStore } from '../../../packages/store/createStore';
import { MainFollow, MainFollowPost } from './follow.model';

export const [useMainFollow, setMainFollow, getMainFollow, onMainFollow] =
  createStore<MainFollow>();
export const [
  useMainFollowPost,
  setMainFollowPost,
  getMainFollowPost,
  onMainFollowPost,
] = createStore<MainFollowPost>();
