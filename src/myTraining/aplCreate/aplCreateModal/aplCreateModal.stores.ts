import { createStore } from 'shared/store/Store';
import { AplCreateModal, initAplCreateModal } from './aplCreateModal.models';

export const [
  setAplCreateModal,
  onAplCreateModal,
  getAplCreateModal,
  useAplCreateModal,
] = createStore<AplCreateModal>(initAplCreateModal());
