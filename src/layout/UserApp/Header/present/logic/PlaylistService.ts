import {
  setProfileCardPlaylist,
  setProfileCardPlaylistCards,
} from './PlaylistStore';
import {
  findMyPlaylistsByDenizenId,
  registerMyPlaylistByPlaylistId,
} from 'playlist/data/apis';
import { parsePolyglotString } from '../../../../../shared/viewmodel/PolyglotString';
import {
  findMyPlaylistCardRdos,
  findPlaylistCardWithProgressRdos,
} from '../../../../../lecture/detail/api/cardApi';
import {
  countAllLikeByFeedbackId,
  findAllLikeByFeedbackIds,
  likeByFeedbackId,
  unlikeByFeedbackId,
} from '../../../../../hotTopic/api/hotTopicLikeApi';
import { patronInfo } from '@nara.platform/dock';

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
    const cardInCubeCount = await findPlaylistCardWithProgressRdos(cardIds);

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

async function addMyPlaylistByPlaylistId(playlistId: string): Promise<boolean> {
  //
  const denizenId = patronInfo.getDenizenId();
  if (denizenId) {
    const myPlaylist = await findMyPlaylistsByDenizenId(denizenId);

    const alreadyRegister = myPlaylist?.find(
      (playlist) => playlist.id === playlistId
    );

    if (alreadyRegister) {
      return false;
    } else {
      await registerMyPlaylistByPlaylistId(playlistId);
      return true;
    }
  }
  return false;
}

async function registerLike(feedbackId: string) {
  //
  await likeByFeedbackId(feedbackId);
}

async function removeLike(feedbackId: string) {
  //
  await unlikeByFeedbackId(feedbackId);
}

export {
  findProfileCardPlaylistByDenizenId,
  addMyPlaylistByPlaylistId,
  registerLike,
  removeLike,
};
