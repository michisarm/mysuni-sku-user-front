import { BadgesModel } from '../model/BadgeModel';
import { createStore } from './Store';

const [
  setProfileInfoBadgesModel,
  onProfileInfoBadgesModel,
  getProfileInfoBadgesModel,
  useProfileInfoBadgesModel
] = createStore<BadgesModel>();

export {
  setProfileInfoBadgesModel,
  onProfileInfoBadgesModel,
  getProfileInfoBadgesModel,
  useProfileInfoBadgesModel
}