import CommunityHome, { getEmptyCommunityHome } from '../viewModel/CommunityHome';
import { createStore } from './Store';

const [
  setCommunityHome,
  onCommunityHome,
  getCommunityHome,
  useCommunityHome,
] = createStore<CommunityHome>(getEmptyCommunityHome());

export {
  setCommunityHome,
  onCommunityHome,
  getCommunityHome,
  useCommunityHome,
};
