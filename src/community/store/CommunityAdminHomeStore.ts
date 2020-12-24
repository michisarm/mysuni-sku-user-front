import AdminHome from '../model/CommunityAdminHome';
import { createStore } from './Store';

const [
  setCommunityAdminHome,
  onCommunityAdminHome,
  getCommunityAdminHome,
  useCommunityAdminHome,
] = createStore<AdminHome>();

export {
  setCommunityAdminHome,
  onCommunityAdminHome,
  getCommunityAdminHome,
  useCommunityAdminHome,
};
