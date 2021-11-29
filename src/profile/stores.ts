import { createStore } from 'restoa';
import SkProfileService from './present/logic/SkProfileService';

export default {
  profile: {
    skProfileService: SkProfileService.instance,
  },
};

export { SkProfileService };

export const [
  useFavoriteChannelIds,
  setFavoriteChannelIds,
  getFavoriteChannelIds,
] = createStore<string[]>([]);
