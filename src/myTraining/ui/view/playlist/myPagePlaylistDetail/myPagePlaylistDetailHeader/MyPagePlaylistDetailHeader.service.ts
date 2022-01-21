import { useEffect } from 'react';
import { createStore } from 'shared/store/Store';
import { requestPlaylistLike } from './MyPagePlaylistDetailHeader.request';

export interface PlaylistLikeInfo {
  feedbackId: string;
  count: number;
  my?: boolean;
}

export const [
  setPlaylistLikeInfo,
  onPlaylistLikeInfo,
  getPlaylistLikeInfo,
  usePlaylistLikeInfo,
] = createStore<PlaylistLikeInfo>();

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}
export const [
  setPlaylistResistrantProfileInfo,
  onPlaylistResistrantProfileInfo,
  getPlaylistResistrantProfileInfo,
  usePlaylistResistrantProfileInfo,
] = createStore<profileParams>();

export function useRequestPlaylistLike() {
  useEffect(() => {
    requestPlaylistLike();
    return setPlaylistLikeInfo();
  }, []);
}
