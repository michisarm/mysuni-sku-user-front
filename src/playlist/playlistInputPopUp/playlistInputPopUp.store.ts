import { createStore } from 'restoa';

interface PlaylistInputPopUp {
  title: string;
  description: string;
  expose: boolean;
}

export const [
  useIsOpenPlaylistInputPopUp,
  setIsOpenPlaylistInputPopUp,
  getIsOpenPlaylistInputPopUp,
] = createStore<boolean>(false);

export const [
  usePlaylistInputPopUp,
  setPlaylistInputPopUp,
  getPlaylistInputPopUp,
] = createStore<PlaylistInputPopUp>({
  title: '',
  description: '',
  expose: true,
});
