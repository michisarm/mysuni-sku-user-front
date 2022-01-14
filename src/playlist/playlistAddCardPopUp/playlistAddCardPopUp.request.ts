import { reactAlert } from '@nara.platform/accent';
import { findByRdo } from 'expert/apis/instructorApi';
import { addCardsToPlaylists } from 'playlist/data/apis';
import { useEffect } from 'react';
import { findAllCollege } from 'shared/service/requestAllColleges';
import { getLectureCardRdo } from './helper/getLectureCardRdo';
import { onClosePlaylistAddCardPopUp } from './playlistAddCardPopUp.events';
import {
  cardRdoToPlaylistAddCard,
  setPlaylistCards,
  setPlaylistColleges,
  collegesToPlaylistColleges,
  setPlaylistAddCardPopUpOffset,
} from './playlistAddCardPopUp.stores';

export async function requestAddCardsToPlaylist(
  cardIds: string[],
  playlistIds: string[]
) {
  await addCardsToPlaylists({ cardIds, playlistIds }).then(() => {
    reactAlert({
      title: 'Card 만들기',
      message: 'Playlist가 생성되었습니다.',
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

  const cardRdo = await findByRdo(lectureCardRdo);

  if (cardRdo !== undefined) {
    setPlaylistCards(cardRdoToPlaylistAddCard(cardRdo.results));
    setPlaylistAddCardPopUpOffset({
      offset: lectureCardRdo.offset || 1,
      totalCount: cardRdo.totalCount,
    });
  }
}

export function useRequestLectureCardRdo() {
  useEffect(() => {
    requestLectureCardRdo();
    requestColleges();
  }, []);
}
