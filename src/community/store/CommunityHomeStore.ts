import CommunityHome from '../viewModel/CommunityHome';
import FollowModalItem from '../viewModel/FollowModalIntro/FollowModalItem';
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
  useModalState
] = createStore<FollowModalItem>({
  id: '',
  nickname: '',
  profileImg: '',
  unfollow: false,
  open: false
});

export {
  setModalState,
  getModalState,
  useModalState
};


