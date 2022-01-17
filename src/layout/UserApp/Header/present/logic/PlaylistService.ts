import {
  setProfileCardPlaylist,
  setProfileCardPlaylistCards,
  ProfileCardPlayListInCards,
  PlaylistInCard,
} from './PlaylistStore';
import { findMyPlaylistsByDenizenId } from 'playlist/data/apis';
import { findCards } from '../../../../../expert/apis/instructorApi';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';

async function findProfileCardPlaylistByDenizenId(denizenId: string) {
  //
  const playlistDetailSummary = await findMyPlaylistsByDenizenId(denizenId);

  setProfileCardPlaylist({
    playListSummaries: playlistDetailSummary,
  });

  const cardIds: string[] = [];

  playlistDetailSummary?.forEach((playlist) => {
    playlist.cardIds.forEach((cardId) => {
      if (!cardIds.includes(cardId)) {
        cardIds.push(cardId);
      }
    });
  });

  if (cardIds) {
    const cards = await findCards(cardIds);

    const playlistInCards: PlaylistInCard[] | undefined = cards?.map((card) => {
      return {
        cardId: card.card.id,
        cardTitle: parsePolyglotString(card.card.name),
        count: 5,
        leaningTime: card.card.learningTime,
      };
    });
    setProfileCardPlaylistCards({
      playlistInCards,
    });
  }
}

export { findProfileCardPlaylistByDenizenId };
