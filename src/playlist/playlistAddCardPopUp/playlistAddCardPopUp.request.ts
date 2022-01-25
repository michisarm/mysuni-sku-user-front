import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert } from '@nara.platform/accent';
import { findByRdo } from 'expert/apis/instructorApi';
import { addCardsToPlaylists } from 'playlist/data/apis';
import { findAllCollege } from 'shared/service/requestAllColleges';
import { getLectureCardRdo } from './helper/getLectureCardRdo';
import { onClosePlaylistAddCardPopUp } from './playlistAddCardPopUp.events';
import {
  cardRdoToPlaylistAddCard,
  setPlaylistCards,
  setPlaylistColleges,
  collegesToPlaylistColleges,
  setPlaylistAddCardPopUpOffset,
  getPlaylistAddCardPopUpOffset,
} from './playlistAddCardPopUp.stores';

export async function requestAddCardsToPlaylist(
  cardIds: string[],
  playlistIds: string[]
) {
  await addCardsToPlaylists({ cardIds, playlistIds }).then(() => {
    reactAlert({
      title: getPolyglotText('Playlist 편집하기', 'playlist-popup-편집하기'),
      message: getPolyglotText(
        'Playlist에 학습카드가 추가되었습니다.',
        'playlist-popup-추가완료'
      ),
      onClose: () => onClosePlaylistAddCardPopUp(),
    });
  });
}

export async function requestColleges() {
  const colleges = await findAllCollege();

  if (colleges !== undefined) {
    setPlaylistColleges(collegesToPlaylistColleges(colleges));
  }
}

export async function requestLectureCardRdo() {
  const lectureCardRdo = getLectureCardRdo();
  const playlistAddCardPopUpOffset = getPlaylistAddCardPopUpOffset();

  const cardRdo = await findByRdo(lectureCardRdo);

  if (cardRdo !== undefined) {
    setPlaylistCards(cardRdoToPlaylistAddCard(cardRdo.results));
    setPlaylistAddCardPopUpOffset({
      ...playlistAddCardPopUpOffset,
      totalCount: cardRdo.totalCount,
    });
  }
}
