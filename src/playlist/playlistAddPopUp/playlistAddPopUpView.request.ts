import { reactAlert } from '@nara.platform/accent';
import {
  addCardsToPlaylists,
  findPlaylistsMadeByMySelf,
  registerPlaylist,
} from 'playlist/data/apis';
import { useEffect } from 'react';
import { madeByMySelfToAddPlaylist } from './playlistAddPopUpView.store';
import { setAddPlaylist } from './playlistAddPopUpView.store';

export async function requestRegisterPlaylist(playlistName: string) {
  await registerPlaylist(playlistName, '', true);
  requestPlaylistAddPopUpView();
}

export async function requestAddCardsToPlaylist(
  cardIds: string[],
  playlistIds: string[]
) {
  await addCardsToPlaylists({
    cardIds,
    playlistIds,
  }).then(() => {
    reactAlert({
      title: 'Playlist 추가하기',
      message: 'Playlist에 학습카드가 추가되었습니다.',
    });
  });
  requestPlaylistAddPopUpView();
}

export async function requestPlaylistAddPopUpView() {
  const playlistsMadeByMySelf = await findPlaylistsMadeByMySelf();

  if (playlistsMadeByMySelf !== undefined) {
    const addPopUpplaylist = madeByMySelfToAddPlaylist(playlistsMadeByMySelf);

    setAddPlaylist(addPopUpplaylist);
  }
}

export function useRequestPlaylistAddPopUpView() {
  useEffect(() => {
    requestPlaylistAddPopUpView();

    return () => {
      setAddPlaylist(undefined);
    };
  }, []);
}
