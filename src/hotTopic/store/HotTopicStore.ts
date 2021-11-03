import {
  HotTopicDetailViewModel,
  HotTopicLikeInfo,
} from 'hotTopic/viewmodel/HotTopicViewModel';
import { createStore } from 'shared/store/Store';

export const [
  setHotTopicDetailViewModel,
  onHotTopicDetailViewModel,
  getHotTopicDetailViewModel,
  useHotTopicDetailViewModel,
] = createStore<HotTopicDetailViewModel>();

export const [
  setHotTopicListViewModel,
  onHotTopicListViewModel,
  getHotTopicListViewModel,
  useHotTopicListViewModel,
] = createStore<HotTopicDetailViewModel[]>([]);

export const [
  setHotTopicLikeInfo,
  onHotTopicLikeInfo,
  getHotTopicLikeInfo,
  useHotTopicLikeInfo,
] = createStore<HotTopicLikeInfo>();
