import CommunityIntro from '../viewModel/CommunityIntro';
import MyCommunityIntro from '../viewModel/MyCommunityIntro/MyCommunityIntro';
import OpenCommunityIntro from '../viewModel/OpenCommunityIntro/OpenCommunityIntro';
import CommunityFollowIntro from '../viewModel/CommunityFollowIntro/FollowCommunityIntro';
import { createStore } from './Store';

const [setCommunityIntro, onCommunityIntro, getCommunityIntro] = createStore<
  CommunityIntro
>();
const [
  setMyCommunityIntro,
  onMyCommunityIntro,
  getMyCommunityIntro,
  useMyCommunityIntro,
] = createStore<MyCommunityIntro>({
  communities: [],
  posts: [],
  communitiesTotalCount: 0,
  postsTotalCount: 0,
});
const [
  setOpenCommunityIntro,
  onOpenCommunityIntro,
  getOpenCommunityIntro,
  useOpenCommunityIntro,
] = createStore<OpenCommunityIntro>({
  fields: [],
  communities: [],
  communitiesTotalCount: 0,
});
const [
  setFollowCommunityIntro,
  onFollowCommunityIntro,
  getFollowCommunityIntro,
  useFollowCommunityIntro,
] = createStore<CommunityFollowIntro>({
  communities: [],
  posts: [],
  communitiesTotalCount: 0,
  postsTotalCount: 0
});

export {
  setCommunityIntro,
  onCommunityIntro,
  getCommunityIntro,
  setMyCommunityIntro,
  onMyCommunityIntro,
  getMyCommunityIntro,
  useMyCommunityIntro,
  setOpenCommunityIntro,
  onOpenCommunityIntro,
  getOpenCommunityIntro,
  useOpenCommunityIntro,
  setFollowCommunityIntro,
  onFollowCommunityIntro,
  getFollowCommunityIntro,
  useFollowCommunityIntro,
};
