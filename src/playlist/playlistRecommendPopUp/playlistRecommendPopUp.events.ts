import { ButtonProps, CheckboxProps } from 'semantic-ui-react';
import { requestRecommendPlaylist } from './playlistRecommendPopUp.request';
import {
  getCheckedMemberList,
  getRecommendation,
  getFollowingList,
  getMySuniUser,
  getDepartmentMember,
  setCheckedMemberList,
  setFollowingList,
  setIsOpenPlaylistRecommendPopUp,
} from './playlistRecommendPopUp.store';
import { onAllCheckMember, onCheckMember } from './helper/onCheckMember';
import { isEmpty } from 'lodash';

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

// 체크된 멤버 선택 해제
export function onClearCheckedMember(_: React.MouseEvent, data: ButtonProps) {
  const memberId = data.id as string;
  const checkedMemberList = getCheckedMemberList();

  const filteredMemberList = checkedMemberList.filter(
    (member) => member.id !== memberId
  );

  setCheckedMemberList(filteredMemberList);
}

// 팔로우 멤버 체크 선택/해제
export function onCheckFollowing(_: React.MouseEvent, data: CheckboxProps) {
  const memberId = data.id as string;
  const isChecked = data.checked || false;
  const following = getFollowingList();

  onCheckMember(memberId, following, isChecked);
}

// 팔로우 멤버 전체 선택/해제
export function onAllCheckedFollowing(
  _: React.MouseEvent,
  data: CheckboxProps
) {
  const memberList = getFollowingList();
  const isChecked = data.checked || false;

  onAllCheckMember(memberList, isChecked);
}

// 마이써니 사용자 체크 선택/해제
export function onCheckMySuniUser(_: React.MouseEvent, data: CheckboxProps) {
  const memberId = data.id as string;
  const isChecked = data.checked || false;
  const mySuniUser = getMySuniUser();

  onCheckMember(memberId, mySuniUser, isChecked);
}

// 마이써니 사용자 전체 선택/해제
export function onAllCheckedMySuniMember(
  _: React.MouseEvent,
  data: CheckboxProps
) {
  const isChecked = data.checked || false;
  const mySuniUser = getMySuniUser();

  onAllCheckMember(mySuniUser, isChecked);
}

// 부서 구성원 체크 선택/해제
export function onCheckDepartmentMember(
  _: React.MouseEvent,
  data: CheckboxProps
) {
  const memberId = data.id as string;
  const isChecked = data.checked || false;
  const departmentMember = getDepartmentMember();

  onCheckMember(memberId, departmentMember, isChecked);
}

// 부서 구성원 전체 선택/해제
export function onAllCheckDepartmentMember(
  _: React.MouseEvent,
  data: CheckboxProps
) {
  const isChecked = data.checked || false;
  const departmentMember = getDepartmentMember();

  onAllCheckMember(departmentMember, isChecked);
}

// 플레이리스트 추천맴버 전체삭제
export function onClickAllClearCheckedMember() {
  setCheckedMemberList([]);
}

// 팔로잉 검색
export function onSearchFollowing(searchText: string) {
  const memberList = getFollowingList();

  if (isEmpty(searchText)) {
    return;
  }

  const filteredMemberList = memberList.filter(
    (member) =>
      member.name.includes(searchText) || member.email.includes(searchText)
  );

  setFollowingList(filteredMemberList);
}

// mySuni사용자 검색
export function onSearchMySuniUser(searchText: string) {
  if (isEmpty(searchText)) {
    return false;
  }

  return true;
}

// 부서 구성원 검색
export function onSearchDepartmentMember(searchText: string) {
  if (isEmpty(searchText)) {
    return false;
  }

  return true;
}
