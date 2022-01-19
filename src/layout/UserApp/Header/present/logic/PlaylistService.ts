import {
  setProfileCardPlaylist,
  setProfileCardPlaylistCards,
  ProfileCardPlayListInCards,
  PlaylistInCard,
  getProfileCardPlaylist,
  ProfileCardPlayListSummaries,
} from './PlaylistStore';
import { findMyPlaylistsByDenizenId, registerMyPlaylistByPlaylistId } from 'playlist/data/apis';
import { findCards } from '../../../../../expert/apis/instructorApi';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import { findMyPlaylistCardRdos } from '../../../../../lecture/detail/api/cardApi';
import {
  countAllLikeByFeedbackId,
  findAllLikeByFeedbackIds,
  likeByFeedbackId,
  unlikeByFeedbackId,
} from '../../../../../hotTopic/api/hotTopicLikeApi';
import { PlaylistDetailSummary } from '../../../../../playlist/data/models/PlaylistDetailSummary';

async function findProfileCardPlaylistByDenizenId(denizenId: string) {
  //
  const playlistDetailSummary = await findMyPlaylistsByDenizenId(denizenId);
  const feedbackIds = playlistDetailSummary?.map(
    (playlist) => playlist.likeFeedbackId
  );

  if (feedbackIds) {
    const likeCounts = await countAllLikeByFeedbackId(feedbackIds);
    const myLikes = await findAllLikeByFeedbackIds(feedbackIds);

    playlistDetailSummary?.forEach((playlist) => {
      likeCounts.forEach((likeCount) => {
        if (likeCount.feedbackId === playlist.likeFeedbackId) {
          playlist.likeCount = likeCount.count;
        }
      });
      myLikes.forEach((myLike) => {
        if (myLike && myLike.feedbackId === playlist.likeFeedbackId) {
          playlist.myLike = true;
        }
      });
    });
  }

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
    const cardInCubeCount = await findMyPlaylistCardRdos(cardIds);

    const playlistInCards = cardInCubeCount.map((card) => {
      return {
        cardId: card.cardId,
        cardTitle: parsePolyglotString(card.cardName),
        count: card.cubeCount || 0,
        leaningTime: card.learningTime,
      };
    });

    setProfileCardPlaylistCards({
      playlistInCards,
    });
  }
}

async function addMyPlaylistByPlaylistId(playlistId: string) {
  //
  await registerMyPlaylistByPlaylistId(playlistId);
}

async function registerLike(feedbackId: string) {
  //
  await likeByFeedbackId(feedbackId);
}

async function removeLike(feedbackId: string) {
  //
  await unlikeByFeedbackId(feedbackId);
}

export { findProfileCardPlaylistByDenizenId, addMyPlaylistByPlaylistId, registerLike, removeLike };
