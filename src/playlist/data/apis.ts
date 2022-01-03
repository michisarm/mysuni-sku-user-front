import { NameValue } from '@nara.platform/accent';
import { OffsetElement } from 'expert/model/OffsetElement';
import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { MadeByMySelf } from './models/MadeByMySelf';
import { MyPlaylists } from './models/MyPlaylists';
import { PlaylistCardAdditionSdo } from './models/PlaylistCardAdditionSdo';
import { PlaylistDetail } from './models/PlaylistDetail';
import { PlaylistRecommendationSdo } from './models/PlaylistRecommendationSdo';
import { PlaylistType } from './models/PlaylistType';
import { UserIdentities } from './models/UserIdentities';

const BASE_URL = '/api/learning/playlists';

export function registerPlaylist(
  description: string,
  expose: boolean,
  title: string
): Promise<string | undefined> {
  const axios = getAxios();

  return axios
    .post<string>(BASE_URL, { description, expose, title })
    .then(AxiosReturn);
}

export function modifyPlaylist(playlistId: string, value: NameValue[]) {
  const axios = getAxios();
  const url = `${BASE_URL}/${playlistId}`;

  return axios.put(url, value).then(AxiosReturn);
}

export function findPlaylistDetail(
  playlistId: string
): Promise<PlaylistDetail | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${playlistId}/detail`;

  return axios.get<PlaylistDetail>(url).then(AxiosReturn);
}

export function findUserIdentitiesRelatedToPlaylist(
  playlistId: string,
  playlistType: PlaylistType
): Promise<UserIdentities | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${playlistId}/userIdentities/?type=${playlistType}`;

  return axios.get<UserIdentities>(url).then(AxiosReturn);
}

export function addCardsToPlaylists(
  playlistCardAdditionSdo: PlaylistCardAdditionSdo
) {
  const axios = getAxios();
  const url = `${BASE_URL}/addCards`;

  return axios.put(url, playlistCardAdditionSdo).then(AxiosReturn);
}

export function findMyPlaylists(
  limit: number,
  offset: number,
  playlistType: PlaylistType
): Promise<OffsetElement<MyPlaylists> | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/available?limit=${limit}&offset=${offset}&type=${playlistType}`;

  return axios.get<OffsetElement<MyPlaylists>>(url).then(AxiosReturn);
}

export function findMyPlaylistsByDenizenId(
  denizenId: string
): Promise<MyPlaylists[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/byDenizenId?=${denizenId}`;

  return axios.get<MyPlaylists[]>(url).then(AxiosReturn);
}

export function findPlaylistsMadeByMySelf(): Promise<
  MadeByMySelf[] | undefined
> {
  const axios = getAxios();
  const url = `${BASE_URL}/madeByMyself`;

  return axios.get<MadeByMySelf[]>(url).then(AxiosReturn);
}

export function recommendPlaylist(
  playlistRecommendationSdo: PlaylistRecommendationSdo
) {
  const axios = getAxios();
  const url = `${BASE_URL}/recommnend`;

  return axios.post(url, playlistRecommendationSdo).then(AxiosReturn);
}

export function registerMyPlaylistByPlaylistId(
  playlistId: string
): Promise<string | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/registerMyPlaylist?playlistId=${playlistId}`;

  return axios.post<string>(url).then(AxiosReturn);
}

export function removeMyPlaylist(myPlaylistId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/removeMyPlaylist?myPlaylistId=${myPlaylistId}`;

  return axios.delete(url).then(AxiosReturn);
}
