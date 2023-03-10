import { createStore } from 'restoa';
import { createCacheApi } from '../../lecture/detail/api/cacheableApi';
import { LangSupport } from '../../lecture/model/LangSupport';
import { getAxios } from '../api/Axios';
import { AxiosReturn } from '../api/AxiosReturn';
import { PolyglotString } from '../viewmodel/PolyglotString';

export interface Channel {
  id: string;
  name: PolyglotString;
  langSupports?: LangSupport[];
}

export interface College {
  id: string;
  name: PolyglotString;
  cineroomId: string;
  langSupports?: LangSupport[];
  channels: Channel[];
}

export const [useAllColleges, setAllColleges, getAllColleges] = createStore<
  College[]
>([]);

export const [useAllChannels, setAllChannels, getAllChannels] = createStore<
  Channel[]
>([]);

export function isMySuniCollege(college: College) {
  return college.cineroomId === 'ne1-m2-c2';
}

export function isMySuniCollegeById(id: string) {
  //
  const allColleges = getAllColleges();

  if (allColleges === undefined) return false;

  const college = allColleges.find((c) => c.id === id);

  if (college === undefined) return false;

  return college.cineroomId === 'ne1-m2-c2';
}

export function findAllCollege() {
  const axios = getAxios();
  return axios.get<College[]>('/api/college/colleges').then(AxiosReturn);
}

export function findAvailableCollegeChannels() {
  const axios = getAxios();
  return axios
    .get<College[]>('/api/college/colleges/available')
    .then(AxiosReturn);
}

export const [findAllCollegeCache] = createCacheApi(findAllCollege);

export async function requestAllColleges() {
  const colleges = (await findAllCollege()) || [];
  setAllColleges(colleges);

  const allChannels = colleges.reduce<Channel[]>(
    (p, c) => [...p, ...c.channels],
    []
  );
  setAllChannels(allChannels);
}
