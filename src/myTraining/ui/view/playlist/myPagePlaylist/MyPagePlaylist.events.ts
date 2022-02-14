import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { PlaylistType } from '../../../../../playlist/data/models/PlaylistType';
import { DropdownProps } from 'semantic-ui-react';
import {
  getMyPagePlaylist,
  getMyPagePlaylistFilterBox,
  setMyPagePlaylist,
  setMyPagePlaylistFilterBox,
} from './MyPagePlaylist.services';
import { findMyPlaylists } from 'playlist/data/apis';
import { requestMyPagePlaylist } from './MyPagePlaylist.request';

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
      return getPolyglotText('추천 받은', 'playlist-item-추천받은');
    case 'MadeByMyself':
      return getPolyglotText('내가 만든', 'playlist-item-내가만든');
    case 'MadeByOthers':
      return getPolyglotText('내가 담은', 'playlist-item-내가담은');
  }
}

export function playListItemTypeForProfileCard(playlistType: PlaylistType) {
  switch (playlistType) {
    case 'Recommended':
      return getPolyglotText('추천', 'playlist-item-추천');
    case 'MadeByMyself':
      return getPolyglotText('생성', 'playlist-item-생성');
    case 'MadeByOthers':
      return getPolyglotText('담음', 'playlist-item-담음');
  }
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

export async function onClickPlaylistSeeMore() {
  const filterBox = getMyPagePlaylistFilterBox();
  if (filterBox === undefined) {
    return;
  }
  const { offset, playlistType } = filterBox;

  const nextValue = await findMyPlaylists(9, offset + 9, playlistType);
  if (nextValue === undefined) {
    return;
  }

  const prevValue = getMyPagePlaylist();
  if (prevValue === undefined) {
    return;
  }

  setMyPagePlaylistFilterBox({ ...filterBox, offset: prevValue.offset + 9 });

  setMyPagePlaylist({
    ...prevValue,
    results: [...prevValue.results, ...nextValue.results],
    totalCount: nextValue.totalCount,
    offset: prevValue.offset + 9,
  });

  //requestMyPagePlaylist();
}
