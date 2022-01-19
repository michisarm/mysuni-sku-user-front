import React from 'react';
import { NoContentsPlaylistSwiperComponent } from './components/NoContentsPlaylistSwiperComponent';
import { PlaylistSwiperComponent } from './components/PlaylistSwiperComponent';
import { useRequestPlaylistSwiper } from './playlistContainer.request';
import { usePlaylistSwiper } from './playlistContainer.store';

export function PlaylistContainerView() {
  useRequestPlaylistSwiper();
  const playlistSwiper = usePlaylistSwiper();

  if (playlistSwiper.length === 0) {
    // <NoContentsPlaylistSwiperComponent />
    return null;
  }

  return <PlaylistSwiperComponent playlistSwiper={playlistSwiper} />;
}
