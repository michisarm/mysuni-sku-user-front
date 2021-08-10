import { createStore } from 'shared/store/Store';
import {
  AplDetailForm,
  AplDetailModal,
  initAplDetailForm,
  initAplDetailModal,
} from './aplDetail.models';

export const [
  setAplDetailForm,
  onAplDetailForm,
  getAplDetailForm,
  useAplDetailForm,
] = createStore<AplDetailForm>(initAplDetailForm());

export const [
  setAplDetailFileMap,
  onAplDetailFileMap,
  getAplDetailFileMap,
  useAplDetailFileMap,
] = createStore<Map<string, any>>(new Map<string, any>());

export const [
  setAplDetailModal,
  onAplDetailModal,
  getAplDetailModal,
  useAplDetailModal,
] = createStore<AplDetailModal>(initAplDetailModal());
