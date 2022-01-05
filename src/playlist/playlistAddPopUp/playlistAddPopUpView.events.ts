import { reactAlert } from '@nara.platform/accent';
import { getLectureCardSummary } from 'lecture/detail/store/LectureOverviewStore';
import { CheckboxProps } from 'semantic-ui-react';
import {
  requestAddCardsToPlaylist,
  requestRegisterPlaylist,
} from './playlistAddPopUpView.request';
import {
  getMyPlaylist,
  getPlaylistName,
  setMyPlaylist,
  setIsOpenPlayListAddPopUp,
  setPlaylistName,
} from './playlistAddPopUpView.store';

export function onOpenPlaylistAddPopUpView() {
  setIsOpenPlayListAddPopUp(true);
}

export function onClosePlaylistAddPopUpView() {
  setIsOpenPlayListAddPopUp(false);
}

// 새로운 플레이리스트 생성시 이름값 스토어에 저장
export function onChangePlaylistName(e: React.ChangeEvent<HTMLInputElement>) {
  setPlaylistName(e.target.value);
}

// 플레이리스트 만들기
export async function onClickAddPlaylist() {
  const playlistName = getPlaylistName();

  if (playlistName === '') {
    reactAlert({
      title: 'Playlist 추가하기',
      // message: getPolyglotText(
      //   `{badgeName} Badge 도전이 시작되었습니다.<p>‘도전 중 Badge’ 탭을 통해 Learning Path에 따라 학습해주세요.<p>뱃지 도전관련 문의는 담당자에게 연락 부탁드립니다.`,
      //   'Certification-도전모달-도전시작',
      // ),
      message: 'Playlist 명을 입력해주세요.',
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
  const cardSummary = getLectureCardSummary();

  if (myPlaylist !== undefined && cardSummary !== undefined) {
    const cardIds = [cardSummary.cardId];
    const checkedPlaylistIds = myPlaylist
      .filter((playlist) => playlist.checked)
      .map((playlist) => playlist.playlistId);

    if (checkedPlaylistIds.length === 0) {
      reactAlert({
        title: 'Playlist 추가하기',
        message: 'Playlist에 추가할 학습카드를 선택해주세요.',
      });
      return;
    }

    requestAddCardsToPlaylist(cardIds, checkedPlaylistIds);
  }
}
