import { College } from '../../data/college/models/College';
import { CollegeBanner } from '../../data/college/models/CollegeBanner';
import { createStore } from '../../../packages/store/createStore';
import { CollegeIdName } from '../models/app.college';
import { TopBannerViewModel } from '../models/app.models';
import { AppProfile } from '../models/app.profile';

export const [useAppProfile, setAppProfile, getAppProfile, onAppProfile] =
  createStore<AppProfile>();

export const [useColleges, setColleges, getColleges, onColleges] = createStore<
  CollegeIdName[]
>([]);
export const [useChannels, setChannels, getChannels, onChannels] = createStore<
  CollegeIdName[]
>([]);

export const [
  useAvailableColleges,
  setAvailableColleges,
  getAvailableColleges,
  onAvailableColleges,
] = createStore<College[]>([]);

export const [
  useCollegeBanners,
  setCollegeBanners,
  getCollegeBanners,
  onCollegeBanners,
] = createStore<CollegeBanner[]>([]);

export function parseCollegeId(collegeId: string) {
  return getColleges()?.find((c) => c.id === collegeId)?.name || '';
}

export function parseChannelId(channelId: string) {
  return getChannels()?.find((c) => c.id === channelId)?.name || '';
}

export const [
  useTopBannerViewModel,
  setTopBannerViewModel,
  getTopBannerViewModel,
  onTopBannerViewModel,
] = createStore<TopBannerViewModel>();
