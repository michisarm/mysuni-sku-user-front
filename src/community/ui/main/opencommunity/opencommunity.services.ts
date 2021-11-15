import { createStore } from '../../../packages/store/createStore';
import {
  AllWithBookMarkCount,
  MainOpenCommunities,
} from './opencommunity.model';

export const [
  useMainOpenCommunities,
  setMainOpenCommunities,
  getMainOpenCommunities,
  onMainOpenCommunities,
] = createStore<MainOpenCommunities>();

export const [
  useAllWithBookMarkCount,
  setAllWithBookMarkCount,
  getAllWithBookMarkCount,
  onAllWithBookMarkCount,
] = createStore<AllWithBookMarkCount>();
