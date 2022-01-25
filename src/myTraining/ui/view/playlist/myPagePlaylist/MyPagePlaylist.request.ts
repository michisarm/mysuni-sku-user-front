import { setMyPagePlaylistFilterBox } from 'myTraining/ui/view/playlist/myPagePlaylist/MyPagePlaylist.services';
import { useEffect } from 'react';
import { findMyPlaylists } from 'playlist/data/apis';
import {
  getMyPagePlaylistFilterBox,
  setMyPagePlaylist,
} from './MyPagePlaylist.services';

export async function requestMyPagePlaylist() {
  const filterBox = getMyPagePlaylistFilterBox();
  if (filterBox === undefined) {
    return;
  }
  const { offset, playlistType } = filterBox;

  const myPagePlaylist = await findMyPlaylists(9, offset, playlistType);
  if (myPagePlaylist === undefined) {
    return;
  }

  setMyPagePlaylist({ ...myPagePlaylist, offset });
}

export function useRequestMyPagePlaylist() {
  useEffect(() => {
    setMyPagePlaylistFilterBox({ playlistType: '', offset: 0 });
    requestMyPagePlaylist();
  }, []);
}
