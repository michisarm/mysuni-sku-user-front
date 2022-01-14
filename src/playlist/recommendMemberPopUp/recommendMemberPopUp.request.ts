import { useEffect } from 'react';
import { findUserIdentitiesRelatedToPlaylist } from 'playlist/data/apis';
import {
  setRecommendMemberPopUp,
  useIsOpenRecommendMemberPopUp,
  userIdentitiesToMemberList,
} from './recommendMemberPopUp.store';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { getMyPagePlaylistDetail } from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.services';

export async function requestRecommendMemberPopUp(playlistType: PlaylistType) {
  const playlistDetail = getMyPagePlaylistDetail();
  const playlistId = playlistDetail?.playlistId || '';

  if (playlistId === '') {
    return;
  }

  const userIdentities = await findUserIdentitiesRelatedToPlaylist(
    playlistId,
    playlistType
  );
  console.log(userIdentities);
  if (userIdentities !== undefined) {
    setRecommendMemberPopUp(userIdentitiesToMemberList(userIdentities));
  }
}

export function useRequestRecommendMemberPopUp(playlistType: PlaylistType) {
  const isOpen = useIsOpenRecommendMemberPopUp();

  useEffect(() => {
    if (isOpen) {
      requestRecommendMemberPopUp(playlistType);
    }
  }, [playlistType, isOpen]);
}
