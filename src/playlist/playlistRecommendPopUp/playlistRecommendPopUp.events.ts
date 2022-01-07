import { requestRecommendPlaylist } from './playlistRecommendPopUp.request';
import {
  getCheckedMemberList,
  getRecommendation,
  setIsOpenPlaylistRecommendPopUp,
} from './playlistRecommendPopUp.store';

export function onOpenPlaylistRecommendPopUp() {
  setIsOpenPlaylistRecommendPopUp(true);
}

export function onClosePlaylistRecommendPopUp() {
  setIsOpenPlaylistRecommendPopUp(false);
}

export function onClickRecommendPlaylist() {
  const denizenIds = getCheckedMemberList().map((member) => member.id);
  const playlistId = '';
  const recommendation = getRecommendation();

  requestRecommendPlaylist(denizenIds, playlistId, recommendation);
}
