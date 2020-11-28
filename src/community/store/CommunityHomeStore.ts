import CommunityHome from '../viewModel/CommunityHome';
import { createStore } from './Store';

const [
  setCommunityHome,
  onCommunityHome,
  getCommunityHome,
  useCommunityHome,
] = createStore<CommunityHome>({
  menus: [],
  notice: [],
  recent: [],
});

export {
  setCommunityHome,
  onCommunityHome,
  getCommunityHome,
  useCommunityHome,
};

// 팔로우/팔로워 모달 상태
const [
  setModalState,
  getModalState,
] = createStore<any>({
  open: false
});

export {
  setModalState,
  getModalState
};


