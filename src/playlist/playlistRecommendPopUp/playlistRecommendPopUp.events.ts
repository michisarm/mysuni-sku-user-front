import {
  AccordionTitleProps,
  ButtonProps,
  CheckboxProps,
} from 'semantic-ui-react';
import {
  requestMemberByDepartmentCode,
  requestMysuniUser,
  requestRecommendPlaylist,
} from './playlistRecommendPopUp.request';
import {
  getCheckedMemberList,
  getFollowingList,
  getMySuniUsers,
  getDepartmentMembers,
  setCheckedMemberList,
  setIsOpenPlaylistRecommendPopUp,
  setMySuniUsers,
  setSelcetedDepartmentCode,
  setSelectedDepartmentName,
} from './playlistRecommendPopUp.store';
import { onAllCheckMember, onCheckMember } from './helper/onCheckMember';
import { getMyPagePlaylistDetail } from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.services';
import { textValidationCheck } from './helper/textValidationCheck';
import { clearRetrieveDepartmentsCache } from 'approval/department/present/apiclient/DepartmentApi';

export function onOpenPlaylistRecommendPopUp() {
  setIsOpenPlaylistRecommendPopUp(true);
}

export function onClosePlaylistRecommendPopUp() {
  setIsOpenPlaylistRecommendPopUp(false);
  setCheckedMemberList([]);
  setMySuniUsers([]);
  clearRetrieveDepartmentsCache();
}

// 플레이리스트 추천하기
export function onRecommendPlaylist(recommendation: string) {
  const denizenIds = getCheckedMemberList().map((member) => member.id);
  const playlistId = getMyPagePlaylistDetail()?.playlistId || '';

  if (
    recommendation.length === 0 ||
    recommendation.length > 50 ||
    playlistId === ''
  ) {
    return;
  }

  requestRecommendPlaylist(denizenIds, playlistId, recommendation);
}

// (플레이리스트 추천하기 팝업 오른쪽 리스트) 체크된 멤버 선택 해제
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
  const memberId = data.value as string;
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
  const memberId = data.value as string;
  const isChecked = data.checked || false;
  const mySuniUser = getMySuniUsers();

  onCheckMember(memberId, mySuniUser, isChecked);
}

// 마이써니 사용자 전체 선택/해제
export function onAllCheckedMySuniMember(
  _: React.MouseEvent,
  data: CheckboxProps
) {
  const isChecked = data.checked || false;
  const mySuniUser = getMySuniUsers();

  onAllCheckMember(mySuniUser, isChecked);
}

// 부서 구성원 체크 선택/해제
export function onCheckDepartmentMember(
  _: React.MouseEvent,
  data: CheckboxProps
) {
  const memberId = data.value as string;
  const isChecked = data.checked || false;
  const departmentMember = getDepartmentMembers();

  onCheckMember(memberId, departmentMember, isChecked);
}

// 부서 구성원 전체 선택/해제
export function onAllCheckDepartmentMember(
  _: React.MouseEvent,
  data: CheckboxProps
) {
  const isChecked = data.checked || false;
  const departmentMember = getDepartmentMembers();

  onAllCheckMember(departmentMember, isChecked);
}

// 플레이리스트 추천맴버 전체삭제
export function onClickAllClearCheckedMember() {
  setCheckedMemberList([]);
}

// 팔로잉 검색
export function onSearchFollowing(searchText: string) {
  const followingList = getFollowingList();
  const isValidationChecked = textValidationCheck(searchText);

  if (isValidationChecked) {
    const filteredFollowingList = followingList.filter(
      (member) =>
        member.name.includes(searchText) || member.email.includes(searchText)
    );

    return filteredFollowingList;
  }
}

// mySuni사용자 검색
export function onSearchMySuniUser(searchText: string) {
  const isValidationChecked = textValidationCheck(searchText);

  if (isValidationChecked) {
    return requestMysuniUser(searchText);
  }
}

// 부서 구성원 검색
export function onSearchDepartmentMember(searchText: string) {
  const departmentMember = getDepartmentMembers();
  const isValidationChecked = textValidationCheck(searchText);

  if (isValidationChecked && departmentMember !== undefined) {
    const filteredDepartmentMember = departmentMember.filter(
      (department) =>
        department.name.includes(searchText) ||
        department.email.includes(searchText)
    );

    return filteredDepartmentMember;
  }
}

// 조직도에서 부서 선택
export function onClickDepartment(
  _: React.MouseEvent,
  data: AccordionTitleProps
) {
  const departmentCode = data.departmentCode as string;
  const departmentName = data.departmentName as string;

  setSelcetedDepartmentCode(departmentCode);
  setSelectedDepartmentName(departmentName);
  requestMemberByDepartmentCode(departmentCode);
}
