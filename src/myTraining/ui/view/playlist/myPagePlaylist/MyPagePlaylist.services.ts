import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { useEffect } from 'react';
import { PlaylistType } from '../../../../../playlist/data/models/PlaylistType';
import { PlaylistDetailSummary } from '../../../../../playlist/data/models/PlaylistDetailSummary';
import { createStore } from 'shared/store/Store';
import requestMyPagePlaylist from './MyPagePlaylist.request';

export const selectOptions = [
  {
    key: '0',
    value: '',
    text: getPolyglotText(`전체`, 'mypage-playlist-전체리스트'),
  },
  {
    key: '1',
    value: 'MadeByMyself',
    text: getPolyglotText(
      `내가 만든 Playlist`,
      'mypage-playlist-내가만든리스트'
    ),
  },
  {
    key: '2',
    value: 'Recommended',
    text: getPolyglotText(
      '추천 받은 Playlist',
      'mypage-playlist-추천받은리스트'
    ),
  },
  {
    key: '2',
    value: 'MadeByOthers',
    text: getPolyglotText(
      '내가 담은 Playlist',
      'mypage-playlist-내가담은리스트'
    ),
  },
];

export interface MyPlaylistsTable {
  totalCount: number;
  results: PlaylistDetailSummary[];
  playListIndex: number;
}

export interface MyPlaylistFilterBox {
  offset: number;
  playlistType: PlaylistType;
}

export const [
  setMyPagePlaylist,
  onMyPagePlaylist,
  getMyPagePlaylist,
  useMyPagePlaylist,
] = createStore<MyPlaylistsTable>();

export const [
  setMyPagePlaylistFilterBox,
  onMyPagePlaylistFilterBox,
  getMyPagePlaylistFilterBox,
  useMyPagePlaylistFilterBox,
] = createStore<MyPlaylistFilterBox>({ offset: 0, playlistType: '' });

export function useRequestMyPagePlaylist() {
  useEffect(() => {
    requestMyPagePlaylist();
  }, []);
}
