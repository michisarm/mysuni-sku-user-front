import FollowModalIntro from '../viewModel/FollowModalIntro/CommunityFollowModalIntro';
import { createStore } from './Store';

const [
  setFollowModal,
  onFollowModal,
  getFollowModal,
  useFollowModal,
] = createStore<FollowModalIntro>({
  communities: [],
  communitiesTotalCount: 0,
  posts: [],
  results: [],
});

export {
  setFollowModal,
  onFollowModal,
  getFollowModal,
  useFollowModal
};