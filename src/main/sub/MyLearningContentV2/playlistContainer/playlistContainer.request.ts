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
    // const madebymyselfPlaylists = [] as PlaylistDetailSummary[];
    // const madebyotherPlaylists = [] as PlaylistDetailSummary[];
    // const recommendedPlaylists = [] as PlaylistDetailSummary[];

    // playlists.results.forEach((playlist) => {
    //   switch (playlist.type) {
    //     case 'MadeByMyself':
    //       madebymyselfPlaylists.push(playlist);
    //       return;
    //     case 'MadeByOthers':
    //       madebyotherPlaylists.push(playlist);
    //       return;
    //     default:
    //       recommendedPlaylists.push(playlist);
    //   }
    // });

    // // 내가 만든, 내가 담은, 추천 받은 플레이리스트 순으로 정렬
    // const sortedPlaylists = [
    //   ...madebymyselfPlaylists,
    //   ...madebyotherPlaylists,
    //   ...recommendedPlaylists,
    // ];
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

    // 스와이퍼에 담기는 아이템 수는 무조건 10개, 10개이하의 플레이리스트를 가지면 나머지 값을 채워준다.
    if (playlistSwiper.length < 10) {
      while (playlistSwiper.length < 10) {
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
