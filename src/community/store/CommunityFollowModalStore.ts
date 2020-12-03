import FollowModalIntro from '../viewModel/FollowModalIntro/CommunityFollowModalIntro';
import { createStore } from './Store';


// modal - follower
const [
  setFollowersModal,
  onFollowersModal,
  getFollowersModal,
  useFollowersModal,
] = createStore<FollowModalIntro>({
  followers: [],
  followings: [],
});


// modal - following
const [
  setFollowingsModal,
  onFollowMingsodal,
  getFollowingsModal,
  useFollowingsModal,
] = createStore<FollowModalIntro>({
  followers: [],
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