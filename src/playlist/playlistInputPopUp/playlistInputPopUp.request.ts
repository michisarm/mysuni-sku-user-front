import requestMyPagePlaylist from 'myTraining/ui/view/playlist/myPagePlaylist/MyPagePlaylist.request';
import { setMyPagePlaylistFilterBox } from 'myTraining/ui/view/playlist/myPagePlaylist/MyPagePlaylist.services';
import requestMyPagePlaylistDetail from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.request';
import { getMyPagePlaylistDetail } from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.services';
import {
  findPlaylistDetail,
  modifyPlaylist,
  registerPlaylist,
} from 'playlist/data/apis';
import { useEffect } from 'react';
import { onClosePlaylistInputPopUp } from './playlistInputPopUp.events';
import { setPlaylistInputPopUp } from './playlistInputPopUp.store';

export function requestSavePlaylistInput(
  title: string,
  description: string,
  expose: boolean
) {
  registerPlaylist(title, description, expose)
    .then(() => onClosePlaylistInputPopUp())
    .then(() => {
      setMyPagePlaylistFilterBox({ playlistType: '', offset: 0 });
      requestMyPagePlaylist();
    });
}

export function requestEditPlaylistInput(
  title: string,
  description: string,
  expose: boolean
) {
  const playlist = getMyPagePlaylistDetail();
  if (playlist === undefined) {
    return;
  }
  const nameValues = [
    { name: 'title', value: title },
    { name: 'description', value: description },
    { name: 'expose', value: JSON.stringify(expose) },
  ];
  modifyPlaylist(playlist.playlistId, { nameValues })
    .then(() => onClosePlaylistInputPopUp())
    .then(() => requestMyPagePlaylistDetail(playlist.playlistId));
}

export async function requsetPlaylistDetail() {
  const playlist = getMyPagePlaylistDetail();
  if (playlist === undefined) {
    return;
  }
  const playlistDetail = await findPlaylistDetail(playlist?.playlistId);

  if (playlistDetail !== undefined) {
    setPlaylistInputPopUp({
      title: playlistDetail.playlist.title,
      description: playlistDetail.playlist.description,
      expose: playlistDetail.playlist.expose,
    });
  }
}

export function useRequestPlaylistDetail(type: 'CREATE' | 'EDIT') {
  useEffect(() => {
    if (type === 'EDIT') {
      requsetPlaylistDetail();
    }
  }, [type]);
}
