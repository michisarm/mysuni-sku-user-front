import React, { useMemo } from 'react';
import { NoContentsPlaylistSwiperComponent } from './components/NoContentsPlaylistSwiperComponent';
import { PlaylistSwiperComponent } from './components/PlaylistSwiperComponent';
import { useRequestPlaylistSwiper } from './playlistContainer.request';
import { usePlaylistSwiper } from './playlistContainer.store';

export function PlaylistContainerView() {
  useRequestPlaylistSwiper();
  const playlistSwiper = usePlaylistSwiper();

  const isAllEmpty = useMemo(() => {
    return playlistSwiper.every((playlist) => playlist.id === '');
  }, [playlistSwiper]);

  if (isAllEmpty) {
    return null;
    // NoContentsPlaylistSwiperComponent;
  }

  return <PlaylistSwiperComponent playlistSwiper={playlistSwiper} />;
}
