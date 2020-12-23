import Home from '../model/Home';
import { createStore } from './Store';

const [
  setCommunityAdminHome,
  onCommunityAdminHome,
  getCommunityAdminHome,
  useCommunityAdminHome,
] = createStore<Home>();

export {
  setCommunityAdminHome,
  onCommunityAdminHome,
  getCommunityAdminHome,
  useCommunityAdminHome,
};
