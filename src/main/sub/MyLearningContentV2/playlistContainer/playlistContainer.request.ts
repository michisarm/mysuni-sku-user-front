import { findMyPlaylists } from 'playlist/data/apis';
import { PlaylistDetailSummary } from 'playlist/data/models/PlaylistDetailSummary';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { useEffect } from 'react';
import {
  playlistsToPlaylistSwiper,
  setPlaylistSwiper,
} from './playlistContainer.store';

export async function requestPlaylistSwiper() {
  const playlists = await findMyPlaylists(99999, 0, '');

  if (playlists !== undefined) {
    const madebymyselfPlaylists = [] as PlaylistDetailSummary[];
    const madebyotherPlaylists = [] as PlaylistDetailSummary[];
    const recommendedPlaylists = [] as PlaylistDetailSummary[];

    playlists.results.forEach((playlist) => {
      switch (playlist.type) {
        case 'MadeByMyself':
          madebymyselfPlaylists.push(playlist);
          return;
        case 'MadeByOthers':
          madebyotherPlaylists.push(playlist);
          return;
        default:
          recommendedPlaylists.push(playlist);
      }
    });

    // 내가 만든, 내가 담은, 추천 받은 플레이리스트 순으로 정렬
    const sortedPlaylists = [
      ...madebymyselfPlaylists,
      ...madebyotherPlaylists,
      ...recommendedPlaylists,
    ];
    const playlistSwiper = playlistsToPlaylistSwiper(sortedPlaylists);

    // 빈 객체는 스와이프에서 플레이리스트 만들기 아이템으로 렌더된다.
    const emptyPlaylist = {
      id: '',
      name: '',
      title: '',
      photoImagePath: '',
      thumbImagePath: '',
      type: '' as PlaylistType,
    };

    // 한번에 보여지는 스와이퍼 아이텐 수가 5개라서 받아온 값이 5개보다 적을 경우 빈 객체를 넣어준다.
    if (playlistSwiper.length < 5) {
      while (playlistSwiper.length < 5) {
        playlistSwiper.push(emptyPlaylist);
      }
    }

    // 플레이리스트 만들기 버튼이 보일 수 있도록빈 객체 하나를 넣어준다.
    playlistSwiper.push(emptyPlaylist);

    setPlaylistSwiper(playlistSwiper);
  }
}

export function useRequestPlaylistSwiper() {
  useEffect(() => {
    requestPlaylistSwiper();
  }, []);
}
