import FollowModalIntro from '../viewModel/FollowModalIntro/CommunityFollowModalIntro';
import FollowingModalIntro from '../viewModel/FollowModalIntro/CommunityFollowingModalIntro';
import { createStore } from './Store';
import FollowingModalIntro from '../viewModel/FollowModalIntro/CommunityFollowingModalIntro';

// modal - follower
const [
  setFollowersModal,
  onFollowersModal,
  getFollowersModal,
  useFollowersModal,
] = createStore<FollowModalIntro>({
  followers: [],
});


// modal - following
const [
  setFollowingsModal,
  onFollowMingsodal,
  getFollowingsModal,
  useFollowingsModal,
] = createStore<FollowingModalIntro>({
  followings: [],
});

export {
  setFollowersModal,
  onFollowersModal,
  getFollowersModal,
  useFollowersModal,

  setFollowingsModal,
  onFollowMingsodal,
  getFollowingsModal,
  useFollowingsModal,
};