import CommunityIntro from '../viewModel/CommunityIntro';
import MyCommunityIntro, {
  getEmptyMyCommunityIntro,
} from '../viewModel/MyCommunityIntro/MyCommunityIntro';
import OpenCommunityIntro, {
  getEmptyOpenCommunityIntro,
} from '../viewModel/OpenCommunityIntro/OpenCommunityIntro';
import CommunityFollowIntro from '../viewModel/CommunityFollowIntro/FollowCommunityIntro';
import { createStore } from './Store';
import CommunityIsLoadingState from '../viewModel/CommunityIsLoadingState';

const [setCommunityIntro, onCommunityIntro, getCommunityIntro] = createStore<
  CommunityIntro
>();
const [
  setMyCommunityIntro,
  onMyCommunityIntro,
  getMyCommunityIntro,
  useMyCommunityIntro,
] = createStore<MyCommunityIntro>(getEmptyMyCommunityIntro());
const [
  setOpenCommunityIntro,
  onOpenCommunityIntro,
  getOpenCommunityIntro,
  useOpenCommunityIntro,
] = createStore<OpenCommunityIntro>(getEmptyOpenCommunityIntro());
const [
  setFollowCommunityIntro,
  onFollowCommunityIntro,
  getFollowCommunityIntro,
  useFollowCommunityIntro,
] = createStore<CommunityFollowIntro>({
  communities: [],
  posts: [],
  communitiesTotalCount: 0,
  communitiesOffset: 0,
  postsTotalCount: 0,
  postsOffset: 0,
});
const [
  setIsLoadingState,
  onIsLoadingState,
  getIsLoadingState,
  useIsLoadingState,
] = createStore<CommunityIsLoadingState>({ isLoading: false });

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
  setIsLoadingState,
  onIsLoadingState,
  getIsLoadingState,
  useIsLoadingState,
};
