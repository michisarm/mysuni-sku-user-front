import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert, reactConfirm } from '@nara.platform/accent';
import { isEmpty } from 'lodash';
import { CheckboxProps } from 'semantic-ui-react';
import {
  requestAddCardsToPlaylist,
  requestPlaylistAddPopUpView,
  requestRegisterPlaylist,
} from './playlistAddPopUpView.request';
import {
  getMyPlaylist,
  setMyPlaylist,
  setIsOpenPlayListAddPopUp,
  getAddLearningCardIds,
} from './playlistAddPopUpView.store';

export function onOpenPlaylistAddPopUpView() {
  setIsOpenPlayListAddPopUp(true);
  requestPlaylistAddPopUpView();
}

export function onClosePlaylistAddPopUpView() {
  setIsOpenPlayListAddPopUp(false);
}

// 플레이리스트 만들기
export async function onClickAddPlaylist(playlistName: string) {
  if (isEmpty(playlistName)) {
    reactAlert({
      title: getPolyglotText('Playlist 추가하기', 'playlist-popup-추가하기'),
      message: getPolyglotText(
        'Playlist 명을 입력해주세요.',
        'playlist-popup-타이틀입력'
      ),
    });
    return false;
  }

  if (playlistName.length > 30) {
    return false;
  }

  try {
    requestRegisterPlaylist(playlistName);
    return true;
  } catch {
    return false;
  }
}

// 플레이리스트 목록 체크
export function onIsCheckPlaylist(_: React.FormEvent, data: CheckboxProps) {
  const playlistId = data.value;
  const myPlaylist = getMyPlaylist();

  if (playlistId !== undefined && myPlaylist !== undefined) {
    const convertAddPlaylist = myPlaylist.map((playlist) => {
      if (playlist.playlistId === playlistId) {
        return {
          ...playlist,
          checked: !playlist.checked,
        };
      }
      return playlist;
    });

    setMyPlaylist(convertAddPlaylist);
  }
}

// 플레이리스트에 학습카드 추가
export function onAddLearningCard() {
  const myPlaylist = getMyPlaylist();
  const cardIds = getAddLearningCardIds();

  if (myPlaylist.length === 0) {
    reactAlert({
      title: getPolyglotText('Playlist 추가하기', 'playlist-popup-추가하기'),
      message: getPolyglotText(
        '생성된 Playlist가 없습니다. <br/> 구성원들과 함께 학습할 Playlist를 만들어보세요!',
        'playlist-popup-NoPlaylist'
      ),
    });
    return;
  }

  const checkedPlaylistIds = myPlaylist
    .filter((playlist) => playlist.checked)
    .map((playlist) => playlist.playlistId);

  if (checkedPlaylistIds.length === 0) {
    reactAlert({
      title: getPolyglotText('Playlist 추가하기', 'playlist-popup-추가하기'),
      message: getPolyglotText(
        '학습카드를 추가할 Playlist를 선택해주세요.',
        'playlist-popup-플레이선택'
      ),
    });
    return;
  }

  reactConfirm({
    title: getPolyglotText('Playlist 편집하기', 'playlist-popup-편집하기'),
    message: getPolyglotText(
      'Playlist를 편집하시겠습니까? <br/> 추천받은 구성원들에게도 편집한 내용이 반영됩니다.',
      'playlist-popup-편집컨펌'
    ),
    onOk: () => requestAddCardsToPlaylist(cardIds, checkedPlaylistIds),
  });
}
