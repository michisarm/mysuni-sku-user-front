import { PlaylistDetailSummary } from 'playlist/data/models/PlaylistDetailSummary';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { createStore } from 'restoa';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export interface PlaylistSwiper {
  id: string;
  title: string;
  name: string;
  photoImagePath: string;
  thumbImagePath: string;
  type: PlaylistType;
}

export function playlistsToPlaylistSwiper(
  playlists: PlaylistDetailSummary[]
): PlaylistSwiper[] {
  const playlistSwiper: PlaylistSwiper[] = playlists.map((playlist) => {
    return {
      id: playlist.id,
      title: playlist.title,
      name: playlist.displayNicknameFirst
        ? playlist.nickname || parsePolyglotString(playlist.name)
        : parsePolyglotString(playlist.name) || playlist.nickname,
      photoImagePath: playlist.photoImagePath,
      thumbImagePath: playlist.thumbImagePath,
      type: playlist.type,
    };
  });

  return playlistSwiper;
}

export const [usePlaylistSwiper, setPlaylistSwiper, getPlaylistSwiper] =
  createStore<PlaylistSwiper[]>([]);
