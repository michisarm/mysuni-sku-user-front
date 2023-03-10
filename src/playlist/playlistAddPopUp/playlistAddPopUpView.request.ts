import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert } from '@nara.platform/accent';
import {
  addCardsToPlaylists,
  findPlaylistsMadeByMySelf,
  registerPlaylist,
} from 'playlist/data/apis';
import {
  setMyPlaylist,
  getMyPlaylist,
  madeByMySelfToMyPlaylist,
  setIsOpenPlayListAddPopUp,
} from './playlistAddPopUpView.store';

export async function requestRegisterPlaylist(playlistName: string) {
  await registerPlaylist(playlistName, '', true);

  const myPlaylist = getMyPlaylist() || [];
  const playlistsMadeByMySelf = await findPlaylistsMadeByMySelf();

  if (playlistsMadeByMySelf !== undefined) {
    const filterdMyPlaylist = myPlaylist
      .filter((playlist) => playlist.checked)
      .map((playlist) => playlist.playlistId);

    setMyPlaylist(
      madeByMySelfToMyPlaylist(playlistsMadeByMySelf, filterdMyPlaylist)
    );
  }
}

export async function requestAddCardsToPlaylist(
  cardIds: string[],
  playlistIds: string[]
) {
  await addCardsToPlaylists({
    cardIds,
    playlistIds,
  })
    .then(() => {
      reactAlert({
        title: getPolyglotText('Playlist 추가하기', 'playlist-popup-추가하기'),
        message: getPolyglotText(
          'Playlist에 학습카드가 추가되었습니다.',
          'playlist-popup-추가완료'
        ),
      });
    })
    .then(() => {
      setIsOpenPlayListAddPopUp(false);
    });
  requestPlaylistAddPopUpView();
}

export async function requestPlaylistAddPopUpView() {
  const playlistsMadeByMySelf = await findPlaylistsMadeByMySelf();

  if (playlistsMadeByMySelf !== undefined) {
    const myplaylist = madeByMySelfToMyPlaylist(playlistsMadeByMySelf);

    setMyPlaylist(myplaylist);
  }
}
