import CommunityIntro from "../viewModel/CommunityIntro";
import MyCommunityIntro from "../viewModel/MyCommunityIntro/MyCommunityIntro";
import OpenCommunityIntro from "../viewModel/OpenCommunityIntro/OpenCommunityIntro";
import { createStore } from "./Store";

const [setCommunityIntro, onCommunityIntro, getCommunityIntro] = createStore<CommunityIntro>();
const [setMyCommunityIntro, onMyCommunityIntro, getMyCommunityIntro] = createStore<MyCommunityIntro>();
const [setOpenCommunityIntro, onOpenCommunityIntro, getOpenCommunityIntro] = createStore<OpenCommunityIntro>();

export {
  setCommunityIntro, onCommunityIntro, getCommunityIntro,
  setMyCommunityIntro, onMyCommunityIntro, getMyCommunityIntro,
  setOpenCommunityIntro, onOpenCommunityIntro, getOpenCommunityIntro,
}