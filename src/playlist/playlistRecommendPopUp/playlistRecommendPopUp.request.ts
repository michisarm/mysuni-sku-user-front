import { recommendPlaylist } from 'playlist/data/apis';

export function requestRecommendPlaylist(
  denizenIds: string[],
  playlistId: string,
  recommendation: string
) {
  recommendPlaylist({
    denizenIds,
    playlistId,
    recommendation,
  });
}

export function requestPlaylistRecommendPopUp() {}
