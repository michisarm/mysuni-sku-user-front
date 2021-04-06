import { BadgeStudent } from '../model/BadgeStudent';
import { createStore } from './Store';

const [
  setChallengeBadgeStudent,
  onChallengeBadgeStudent,
  getChallengeBadgeStudent,
  useChallengeBadgeStudent,
] = createStore<BadgeStudent>();

export {
  setChallengeBadgeStudent,
  onChallengeBadgeStudent,
  getChallengeBadgeStudent,
  useChallengeBadgeStudent,
};
