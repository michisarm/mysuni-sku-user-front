import { reactAlert } from '@nara.platform/accent';
import { isEmpty } from 'lodash';
import requestMyPagePlaylistDetail from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.request';
import { getMyPagePlaylistDetail } from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.services';
import { CheckboxProps, DropdownProps } from 'semantic-ui-react';
import {
  requestAddCardsToPlaylist,
  requestColleges,
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
  requestColleges();
}

export function onClosePlaylistAddCardPopUp() {
  setIsOpenPlaylistAddCardPopUp(false);
  setPlaylistAddCardPopUpOffset({
    offset: 1,
    totalCount: 0,
  });
  setCheckedCardIds([]);
  setSearchWord('');
  setSelectedCollegeId('');
  setSelectedChannelId('');
}

// college 선택
export function onSelectCollege(_: React.SyntheticEvent, data: DropdownProps) {
  const collegeId = data.value as string;

  setSelectedCollegeId(collegeId);
  setSelectedChannelId('');
}

// channel 선택
export function onSelectChannel(_: React.SyntheticEvent, data: DropdownProps) {
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
  const { offset, totalCount } = playlistAddCardPopUpOffset;

  if (offset === Number(e.currentTarget.text)) {
    return;
  }

  setPlaylistAddCardPopUpOffset({
    offset: Number(e.currentTarget.text),
    totalCount,
  });

  requestLectureCardRdo();
}

// offset + 1
export function onChangeNextOffset() {
  const playlistAddCardPopUpOffset = getPlaylistAddCardPopUpOffset();
  const { offset, totalCount } = playlistAddCardPopUpOffset;

  setPlaylistAddCardPopUpOffset({
    offset: offset + 1,
    totalCount,
  });
}

// offset - 1
export function onChangePrevOffset() {
  const playlistAddCardPopUpOffset = getPlaylistAddCardPopUpOffset();
  const { offset, totalCount } = playlistAddCardPopUpOffset;

  setPlaylistAddCardPopUpOffset({
    offset: offset - 1,
    totalCount,
  });
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
  const playlistIds = getMyPagePlaylistDetail()?.playlistId || '';

  if (playlistIds === '') {
    return;
  }

  if (isEmpty(cardIds)) {
    reactAlert({
      title: 'Playlist 과정 추가',
      message: 'Playlisy에 추가할 학습카드를 선택해주세요.',
    });
    return;
  }

  requestAddCardsToPlaylist(cardIds, [playlistIds]).then(() =>
    requestMyPagePlaylistDetail(playlistIds)
  );
}
