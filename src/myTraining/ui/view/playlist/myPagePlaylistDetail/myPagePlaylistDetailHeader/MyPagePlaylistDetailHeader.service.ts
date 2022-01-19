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

export function useRequestPlaylistLike() {
  useEffect(() => {
    requestPlaylistLike();
    return setPlaylistLikeInfo();
  }, []);
}
