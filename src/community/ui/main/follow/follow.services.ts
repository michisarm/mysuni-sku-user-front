import { createStore } from '../../../packages/store/createStore';
import { MainFollow } from './follow.model';

export const [useMainFollow, setMainFollow, getMainFollow, onMainFollow] =
  createStore<MainFollow>();
