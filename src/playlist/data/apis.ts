import { PlaylistDetailSummary } from './models/PlaylistDetailSummary';
import { NameValue, OffsetElementList } from '@nara.platform/accent';
import { getAxios } from 'shared/api/Axios';
import { AxiosReturn } from 'shared/api/AxiosReturn';
import { MadeByMySelf } from './models/MadeByMySelf';
import { MyPlaylists } from './models/MyPlaylists';
import { PlaylistCardAdditionSdo } from './models/PlaylistCardAdditionSdo';
import { PlaylistDetail } from './models/PlaylistDetail';
import { PlaylistRecommendationSdo } from './models/PlaylistRecommendationSdo';
import { PlaylistType } from './models/PlaylistType';
import { UserIdentities } from './models/UserIdentities';
import { NameValueList } from 'shared/model';

const BASE_URL = '/api/learning/playlists';

//  Playlist 생성.
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

// Playlist 변경 - 카드 리스트 변경 (name: cardIds, value : List<String>)
export function modifyPlaylist(playlistId: string, value: NameValueList) {
  const axios = getAxios();
  const url = `${BASE_URL}/${playlistId}`;

  return axios.put(url, value).then(AxiosReturn);
}

// Playlist 상세 조회.
export function findPlaylistDetail(
  playlistId: string
): Promise<PlaylistDetail | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${playlistId}/detail`;

  return axios.get<PlaylistDetail>(url).then(AxiosReturn);
}

// Playlist 와 관련 있는 사람 목록 조회.
export function findUserIdentitiesRelatedToPlaylist(
  playlistId: string,
  playlistType: PlaylistType
): Promise<UserIdentities | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/${playlistId}/userIdentities/?type=${playlistType}`;

  return axios.get<UserIdentities>(url).then(AxiosReturn);
}

// 내가 만든 Playlist 에 카드 추가.
export function addCardsToPlaylists(
  playlistCardAdditionSdo: PlaylistCardAdditionSdo
) {
  const axios = getAxios();
  const url = `${BASE_URL}/addCards`;

  return axios.put(url, playlistCardAdditionSdo).then(AxiosReturn);
}

// 내가 볼 수 있는 Playlist 조회.
export function findMyPlaylists(
  offset: number,
  playlistType: PlaylistType
): Promise<OffsetElementList<PlaylistDetailSummary> | undefined> {
  const axios = getAxios();
  const limit = 9;
  const url = `${BASE_URL}/available?limit=${limit}&offset=${offset}&type=${playlistType}`;

  return axios
    .get<OffsetElementList<PlaylistDetailSummary>>(url)
    .then(AxiosReturn);
}

// denizenId로 다른 사용자의 Playlist 조회.
export function findMyPlaylistsByDenizenId(
  denizenId: string
): Promise<PlaylistDetailSummary[] | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/byDenizenId?=${denizenId}`;

  return axios.get<PlaylistDetailSummary[]>(url).then(AxiosReturn);
}

// 내가 만든 Playlist 전체 조회.
export function findPlaylistsMadeByMySelf(): Promise<
  MadeByMySelf[] | undefined
> {
  const axios = getAxios();
  const url = `${BASE_URL}/madeByMyself`;

  return axios.get<MadeByMySelf[]>(url).then(AxiosReturn);
}

// Playlist 추천하기.
export function recommendPlaylist(
  playlistRecommendationSdo: PlaylistRecommendationSdo
) {
  const axios = getAxios();
  const url = `${BASE_URL}/recommnend`;

  return axios.post(url, playlistRecommendationSdo).then(AxiosReturn);
}

// 다른 사람이 생성한 Playlist 담기.
export function registerMyPlaylistByPlaylistId(
  playlistId: string
): Promise<string | undefined> {
  const axios = getAxios();
  const url = `${BASE_URL}/registerMyPlaylist?playlistId=${playlistId}`;

  return axios.post<string>(url).then(AxiosReturn);
}

// MyPlaylist 삭제하기.
export function removeMyPlaylist(myPlaylistId: string) {
  const axios = getAxios();
  const url = `${BASE_URL}/removeMyPlaylist?myPlaylistId=${myPlaylistId}`;

  return axios.delete(url).then(AxiosReturn);
}
