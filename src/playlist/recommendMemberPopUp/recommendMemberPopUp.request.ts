import { useEffect } from 'react';
import { findUserIdentitiesRelatedToPlaylist } from 'playlist/data/apis';
import {
  setRecommendMemberPopUp,
  userIdentitiesToMemberList,
} from './recommendMemberPopUp.store';
import { PlaylistType } from 'playlist/data/models/PlaylistType';

export async function requestRecommendMemberPopUp(playlistType: PlaylistType) {
  const playlistId = '';

  const userIdentities = await findUserIdentitiesRelatedToPlaylist(
    playlistId,
    playlistType
  );

  if (userIdentities !== undefined) {
    setRecommendMemberPopUp(userIdentitiesToMemberList(userIdentities));
  }
}

export function useRequestRecommendMemberPopUp(playlistType: PlaylistType) {
  useEffect(() => {
    requestRecommendMemberPopUp(playlistType);
  }, [playlistType]);
}
