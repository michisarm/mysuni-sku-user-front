import { createStore } from 'restoa';
import { MadeByMySelf } from '../data/models/MadeByMySelf';
import dayjs from 'dayjs';

export interface MyPlaylist {
  checked: boolean;
  playlistId: string;
  title: string;
  learningCardCount: number;
  registeredTime: string;
  expose: boolean;
}

export function madeByMySelfToMyPlaylist(
  madeByMySelfPlaylist: MadeByMySelf[],
  checkedPlaylistIds: string[] = []
): MyPlaylist[] {
  const myPlaylist = madeByMySelfPlaylist.map((playlist) => {
    return {
      checked: checkedPlaylistIds.includes(playlist.id),
      playlistId: playlist.id,
      title: playlist.title,
      learningCardCount: playlist.cardIds?.length || 0,
      registeredTime: dayjs(playlist.registeredTime).format('YYYY.MM.DD'),
      expose: playlist.expose,
    };
  });

  return myPlaylist;
}

export const [useMyPlaylist, setMyPlaylist, getMyPlaylist] = createStore<
  MyPlaylist[]
>([]);

export const [
  useIsOpenPlayListAddPopUp,
  setIsOpenPlayListAddPopUp,
  getIsOpenPlayListAddPopUp,
] = createStore<boolean>(false);

export const [
  useAddLearningCardIds,
  setAddLearningCardIds,
  getAddLearningCardIds,
] = createStore<string[]>([]);
