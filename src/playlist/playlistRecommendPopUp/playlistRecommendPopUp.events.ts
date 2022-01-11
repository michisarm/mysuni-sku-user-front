import { CheckboxProps } from 'semantic-ui-react';
import { requestRecommendPlaylist } from './playlistRecommendPopUp.request';
import {
  getCheckedMemberList,
  getMemberList,
  getRecommendation,
  MemberList,
  setCheckedMemberList,
  setIsOpenPlaylistRecommendPopUp,
  setMemberList,
} from './playlistRecommendPopUp.store';
import { find } from 'lodash';

export function onOpenPlaylistRecommendPopUp() {
  setIsOpenPlaylistRecommendPopUp(true);
}

export function onClosePlaylistRecommendPopUp() {
  setIsOpenPlaylistRecommendPopUp(false);
}

// 플레이리스트 추천하기
export function onClickRecommendPlaylist() {
  const denizenIds = getCheckedMemberList().map((member) => member.id);
  const playlistId = '';
  const recommendation = getRecommendation();

  if (recommendation.length > 50) {
    return;
  }

  requestRecommendPlaylist(denizenIds, playlistId, recommendation);
}

// 플레이리스트 추천할 멤버 선택/해제
export function onCheckMember(_: React.MouseEvent, data: CheckboxProps) {
  const memberId = data.id as string;
  const checkedMemberList = getCheckedMemberList();
  const memberList = getMemberList();
  const findMember = find(memberList, memberId) || ({} as MemberList);
  const isChecked = checkedMemberList.some((member) => member.id === memberId);

  if (isChecked) {
    const filteredMemberList = memberList.filter(
      (member) => member.id !== memberId
    );
    setCheckedMemberList(filteredMemberList);
  } else {
    setCheckedMemberList([...checkedMemberList, findMember]);
  }
}

// 플레이리스트 추천멤버 전체선택
export function onAllCheckedMember() {
  const memberList = getMemberList();
  setCheckedMemberList(memberList);
}

// 플레이리스트 추천맴버 전체삭제
export function onClickAllClearCheckedMember() {
  setCheckedMemberList([]);
}

// 팔로잉 검색
export function onSearchFollowing(searchText: string) {
  const memberList = getMemberList();

  const filteredMemberList = memberList.filter(
    (member) =>
      member.name.includes(searchText) || member.email.includes(searchText)
  );

  setMemberList(filteredMemberList);
}

// 소속 부서 구성원, mySuni사용자 검색
export function onSearchUser(searchText: string) {}
