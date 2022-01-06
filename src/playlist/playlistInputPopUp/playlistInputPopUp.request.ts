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
  registerPlaylist(title, description, expose).then(() =>
    onClosePlaylistInputPopUp()
  );
}

export function requestEditPlaylistInput(
  title: string,
  description: string,
  expose: boolean
) {
  const playlistId = '';
  const NameValue = [
    { name: 'title', value: title },
    { name: 'description', value: description },
    { name: 'expose', value: JSON.stringify(expose) },
  ];
  modifyPlaylist(playlistId, NameValue).then(() => onClosePlaylistInputPopUp());
}

export async function requsetPlaylistDetail() {
  const playlistId = '';
  const playlistDetail = await findPlaylistDetail(playlistId);

  if (playlistDetail !== undefined) {
    setPlaylistInputPopUp({
      title: playlistDetail.playlist.title,
      description: playlistDetail.playlist.description,
      expose: playlistDetail.playlist.expose,
    });
  }
}

export function useRequestPlaylistDetail() {
  useEffect(() => {
    requsetPlaylistDetail();

    return () =>
      setPlaylistInputPopUp({
        title: '',
        description: '',
        expose: true,
      });
  }, []);
}
