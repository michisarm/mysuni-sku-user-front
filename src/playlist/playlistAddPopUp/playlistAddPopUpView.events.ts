import { reactAlert } from '@nara.platform/accent';
import { getLectureCardSummary } from 'lecture/detail/store/LectureOverviewStore';
import { CheckboxProps } from 'semantic-ui-react';
import {
  requestAddCardsToPlaylist,
  requestRegisterPlaylist,
} from './playlistAddPopUpView.request';
import {
  getAddPlaylist,
  getPlaylistName,
  setAddPlaylist,
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
  }

  requestRegisterPlaylist(playlistName);
}

// 플레이리스트 목록 체크
export function onIsCheckPlaylist(_: React.FormEvent, data: CheckboxProps) {
  const playlistId = data.value;
  const addPlaylist = getAddPlaylist();

  if (playlistId !== undefined && addPlaylist !== undefined) {
    const convertAddPlaylist = addPlaylist.map((playlist) => {
      if (playlist.playlistId === playlistId) {
        return {
          ...playlist,
          checked: !playlist.checked,
        };
      }
      return playlist;
    });

    setAddPlaylist(convertAddPlaylist);
  }
}

// 플레이리스트에 학습카드 추가
export function onAddLearningCard() {
  const addPlaylist = getAddPlaylist();
  const cardSummary = getLectureCardSummary();

  if (addPlaylist !== undefined && cardSummary !== undefined) {
    const cardIds = [cardSummary.cardId];
    const checkedPlaylistIds = addPlaylist
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
