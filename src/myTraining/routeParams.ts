import { createStore } from 'shared/store/Store';
import { MyApprovalContentType } from './ui/model/MyApprovalContentType';
import { MyLearningContentType } from './ui/model/MyLearningContentType';

export interface MyTrainingRouteParams {
  tab: MyLearningContentType;
  pageNo: string;
}
export interface AplDetailRouteParams {
  page: string;
  aplId: string;
}

export interface MyApprovalRouteParams {
  tab: MyApprovalContentType;
  pageNo: string;
}

export const [
  setMyTrainingRouteParams,
  onMyTrainingRouteParams,
  getMyTrainingRouteParams,
  useMyTrainingRouteParams,
] = createStore<MyTrainingRouteParams>();

export const [
  setAplDetailRouteParams,
  onAplDetailRouteParams,
  getAplDetailRouteParams,
  useAplDetailRouteParams,
] = createStore<AplDetailRouteParams>();

export const [
  setMyApprovalRouteParams,
  onMyApprovalRouteParams,
  getMyApprovalRouteParams,
  useMyApprovalRouteParams,
] = createStore<MyApprovalRouteParams>();
