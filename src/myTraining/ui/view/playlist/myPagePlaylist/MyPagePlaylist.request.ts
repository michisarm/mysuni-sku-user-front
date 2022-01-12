import { findMyPlaylists } from 'playlist/data/apis';
import {
  getMyPagePlaylistFilterBox,
  setMyPagePlaylist,
} from './MyPagePlaylist.services';

async function requestMyPagePlaylist() {
  const filterBox = getMyPagePlaylistFilterBox();
  if (filterBox === undefined) {
    return;
  }
  const { offset, playlistType } = filterBox;

  const myPagePlaylist = await findMyPlaylists(offset, playlistType);
  if (myPagePlaylist === undefined) {
    return;
  }

  setMyPagePlaylist({ ...myPagePlaylist, offset });
}

export default requestMyPagePlaylist;
