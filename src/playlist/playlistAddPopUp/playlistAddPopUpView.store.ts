import { createStore } from 'restoa';
import { MadeByMySelf } from '../data/models/MadeByMySelf';
import dayjs from 'dayjs';

export interface AddPlaylist {
  checked: boolean;
  playlistId: string;
  title: string;
  learningCardCount: number;
  registeredTime: string;
  expose: boolean;
}

export function madeByMySelfToAddPlaylist(
  madeByMySelfPlaylist: MadeByMySelf[]
): AddPlaylist[] {
  const addPoppUpPlaylist = madeByMySelfPlaylist.map((playlist) => {
    return {
      checked: false,
      playlistId: playlist.id,
      title: playlist.title,
      learningCardCount: playlist.cardIds?.length || 0,
      registeredTime: dayjs(playlist.registeredTime).format('YYYY.MM.DD'),
      expose: playlist.expose,
    };
  });

  return addPoppUpPlaylist;
}

export const [useAddPlaylist, setAddPlaylist, getAddPlaylist] = createStore<
  AddPlaylist[] | undefined
>(undefined);

export const [usePlaylistName, setPlaylistName, getPlaylistName] =
  createStore<string>('');

export const [
  useIsOpenPlayListAddPopUp,
  setIsOpenPlayListAddPopUp,
  getIsOpenPlayListAddPopUp,
] = createStore<boolean>(false);
