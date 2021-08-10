import { createStore } from 'shared/store/Store';
import { MyLearningContentType } from './ui/model/MyLearningContentType';

export interface MyTrainingRouteParams {
  tab: MyLearningContentType;
  pageNo: string;
}

export const [
  setMyTrainingRouteParams,
  onMyTrainingRouteParams,
  getMyTrainingRouteParams,
  useMyTrainingRouteParams,
] = createStore<MyTrainingRouteParams>();

export interface AplDetailRouteParams {
  page: string;
  aplId: string;
}

export const [
  setAplDetailRouteParams,
  onAplDetailRouteParams,
  getAplDetailRouteParams,
  useAplDetailRouteParams,
] = createStore<AplDetailRouteParams>();
