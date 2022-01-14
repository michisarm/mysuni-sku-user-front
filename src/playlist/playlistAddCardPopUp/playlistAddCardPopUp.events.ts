import { reactAlert } from '@nara.platform/accent';
import { isEmpty } from 'lodash';
import { CheckboxProps, DropdownProps } from 'semantic-ui-react';
import {
  requestAddCardsToPlaylist,
  requestLectureCardRdo,
} from './playlistAddCardPopUp.request';
import {
  getCheckedCardIds,
  setSelectedCollegeId,
  setIsOpenPlaylistAddCardPopUp,
  setSelectedChannelId,
  setSearchWord,
  setCheckedCardIds,
  getPlaylistAddCardPopUpOffset,
  setPlaylistAddCardPopUpOffset,
} from './playlistAddCardPopUp.stores';

export function onOpenPlaylistAddCardPopUp() {
  requestLectureCardRdo();
  setIsOpenPlaylistAddCardPopUp(true);
}

export function onClosePlaylistAddCardPopUp() {
  setIsOpenPlaylistAddCardPopUp(false);
  setPlaylistAddCardPopUpOffset({
    offset: 1,
    totalCount: 0,
  });
}

// college 선택
export function onSelectCollege(_: React.KeyboardEvent, data: DropdownProps) {
  const collegeId = data.value as string;

  setSelectedCollegeId(collegeId);
}

// channel 선택
export function onSelectChannel(_: React.KeyboardEvent, data: DropdownProps) {
  const channelId = data.value as string;

  setSelectedChannelId(channelId);
}

// 학습 카드 체크
export function onCheckedCard(_: React.MouseEvent, data: CheckboxProps) {
  const checkedCardIds = getCheckedCardIds();
  const cardId = data.value as string;
  const isChecked = data.checked;

  if (isChecked) {
    setCheckedCardIds([...checkedCardIds, cardId]);
  } else {
    const filteredCardIds = checkedCardIds.filter(
      (checkedCardId) => checkedCardId !== cardId
    );
    setCheckedCardIds(filteredCardIds);
  }
}

// offset 변경
export function onChangeOffset(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  const playlistAddCardPopUpOffset = getPlaylistAddCardPopUpOffset();

  setPlaylistAddCardPopUpOffset({
    offset: Number(e.currentTarget.text),
    totalCount: playlistAddCardPopUpOffset.totalCount,
  });

  requestLectureCardRdo();
}

// 검색어
export function onChangeSearchWord(e: React.ChangeEvent<HTMLInputElement>) {
  setSearchWord(e.target.value);
}

// 학습카드 검색
export function onSearchCard() {
  requestLectureCardRdo();
}

// 학습카드 추가하기
export function onAddCardToPlaylist() {
  const cardIds = getCheckedCardIds();
  const playlistIds = [''];

  if (isEmpty(cardIds)) {
    reactAlert({
      title: 'Playlist 과정 추가',
      message: 'Playlisy에 추가할 학습카드를 선택해주세요.',
    });
    return;
  }

  requestAddCardsToPlaylist(cardIds, playlistIds);
}
