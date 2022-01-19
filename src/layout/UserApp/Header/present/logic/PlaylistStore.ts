import { createStore } from '../../../../../shared/store/Store';
import { PlaylistDetailSummary } from '../../../../../playlist/data/models/PlaylistDetailSummary';

export interface ProfileCardPlayListSummaries {
  playListSummaries: PlaylistDetailSummary[] | undefined;
}

export function getEmptyProfileCardPlayListSummaries(): ProfileCardPlayListSummaries {
  return {
    playListSummaries: undefined,
  };
}

export interface ProfileCardPlayListInCards {
  playlistInCards: PlaylistInCard[] | undefined;
}

export function getEmptyProfileCardPlayListInCards(): ProfileCardPlayListInCards {
  return {
    playlistInCards: undefined,
  };
}

export interface PlaylistInCard {
  cardId: string;
  cardTitle: string;
  count: number;
  leaningTime: number;
}

export const [
  setProfileCardPlaylist,
  onProfileCardPlaylist,
  getProfileCardPlaylist,
  useProfileCardPlaylist,
] = createStore<ProfileCardPlayListSummaries>(
  getEmptyProfileCardPlayListSummaries()
);

export const [
  setProfileCardPlaylistCards,
  onProfileCardPlaylistCards,
  getProfileCardPlaylistCards,
  useProfileCardPlaylistCards,
] = createStore<ProfileCardPlayListInCards>(
  getEmptyProfileCardPlayListInCards()
);
