import { getMyPagePlaylistDetail } from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.services';
import {
  findPlaylistDetail,
  modifyPlaylist,
  registerPlaylist,
} from 'playlist/data/apis';
import { useEffect } from 'react';
import { onClosePlaylistInputPopUp } from './playlistInputPopUp.events';
import {
  setPlaylistInputPopUp,
  useIsOpenPlaylistInputPopUp,
  setIsOpenPlaylistInputPopUp,
} from './playlistInputPopUp.store';

export function requestSavePlaylistInput(
  title: string,
  description: string,
  expose: boolean
) {
  return registerPlaylist(title, description, expose).then((playlistId) => {
    onClosePlaylistInputPopUp();
    return playlistId;
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
  return modifyPlaylist(playlist.playlistId, { nameValues }).then(() => {
    onClosePlaylistInputPopUp();
    return true;
  });
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
  const isOpen = useIsOpenPlaylistInputPopUp();

  useEffect(() => {
    setIsOpenPlaylistInputPopUp(false);
    setPlaylistInputPopUp({
      title: '',
      description: '',
      expose: true,
    });
  }, []);

  useEffect(() => {
    if (type === 'EDIT' && isOpen) {
      requsetPlaylistDetail();
    }
  }, [type, isOpen]);
}
