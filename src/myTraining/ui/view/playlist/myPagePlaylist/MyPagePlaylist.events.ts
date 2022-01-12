import { useHistory } from 'react-router-dom';
import { PlaylistType } from '../../../../../playlist/data/models/PlaylistType';
import { ButtonProps, DropdownProps } from 'semantic-ui-react';
import {
  getMyPagePlaylist,
  getMyPagePlaylistFilterBox,
  setMyPagePlaylist,
  setMyPagePlaylistFilterBox,
} from './MyPagePlaylist.services';
import { findMyPlaylists } from 'playlist/data/apis';
import requestMyPagePlaylist from './MyPagePlaylist.request';

export function playListItemClassName(playlistType: PlaylistType) {
  switch (playlistType) {
    case 'Recommended':
      return 'recommended';
    case 'MadeByMyself':
      return 'my';
    case 'MadeByOthers':
      return 'like';
  }
}
export function playListItemType(playlistType: PlaylistType) {
  switch (playlistType) {
    case 'Recommended':
      return '추천 받은';
    case 'MadeByMyself':
      return '내가 만든';
    case 'MadeByOthers':
      return '내가 담은';
  }
}

export async function onMyPagePlaylistMoreViewClick(
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  data: ButtonProps
) {
  const filterBox = getMyPagePlaylistFilterBox();
  if (filterBox === undefined) {
    return;
  }
  const { offset, playlistType } = filterBox;

  const myPagePlaylist = await findMyPlaylists(offset, playlistType);
  if (myPagePlaylist === undefined) {
    return;
  }

  const value = getMyPagePlaylist();
  if (value === undefined) {
    return;
  }
  setMyPagePlaylist({
    ...value,
    results: [...value.results, ...myPagePlaylist.results],
    totalCount: myPagePlaylist.totalCount,
    playListIndex: value.playListIndex + myPagePlaylist.results.length,
  });

  requestMyPagePlaylist();
}

export function onMyPagePlaylistPageFilter(
  _: React.SyntheticEvent<HTMLElement>,
  data: DropdownProps
) {
  console.log(data.value);
  setMyPagePlaylistFilterBox({
    offset: 0,
    playlistType: data.value as PlaylistType,
  });

  requestMyPagePlaylist();
}
