import CommunityIntro from '../viewModel/CommunityIntro';
import MyCommunityIntro, {
  getEmptyMyCommunityIntro,
} from '../viewModel/MyCommunityIntro/MyCommunityIntro';
import OpenCommunityIntro, {
  getEmptyOpenCommunityIntro,
} from '../viewModel/OpenCommunityIntro/OpenCommunityIntro';
import { createStore } from './Store';

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
};
