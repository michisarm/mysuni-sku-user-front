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
