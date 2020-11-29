import FollowModalIntro from '../viewModel/FollowModalIntro/FollowModalIntro';
import { createStore } from './Store';

const [
  setFollowModal,
  onFollowModal,
  getFollowModal,
  useFollowModal,
] = createStore<FollowModalIntro>({
  communities: [],
  communitiesTotalCount: 0
});

export {
  setFollowModal,
  onFollowModal,
  getFollowModal,
  useFollowModal
};