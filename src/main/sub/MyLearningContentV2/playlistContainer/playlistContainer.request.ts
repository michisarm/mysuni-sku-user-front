import { findMyPlaylists } from 'playlist/data/apis';
import { PlaylistDetailSummary } from 'playlist/data/models/PlaylistDetailSummary';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { useEffect } from 'react';
import {
  playlistsToPlaylistSwiper,
  setPlaylistSwiper,
} from './playlistContainer.store';

export async function requestPlaylistSwiper() {
  const playlists = await findMyPlaylists(10, 0, '');

  if (playlists !== undefined) {
    const playlistSwiper = playlistsToPlaylistSwiper(playlists.results);

    // 빈 객체는 스와이프에서 플레이리스트 만들기 아이템으로 렌더된다.
    const emptyPlaylist = {
      id: '',
      name: '',
      title: '',
      photoImagePath: '',
      thumbImagePath: '',
      type: '' as PlaylistType,
    };

    // 5개 미만일 때만 5개까지 emptyPlaylist로 채워준다. ex)3개일 경우 => empty 2개 추가 => 총 5개
    if (playlistSwiper.length < 5) {
      while (playlistSwiper.length < 5) {
        playlistSwiper.push(emptyPlaylist);
      }
    }

    setPlaylistSwiper(playlistSwiper);
  }
}

export function useRequestPlaylistSwiper() {
  useEffect(() => {
    requestPlaylistSwiper();
  }, []);
}
