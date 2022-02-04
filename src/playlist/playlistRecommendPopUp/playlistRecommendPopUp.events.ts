import {
  AccordionTitleProps,
  ButtonProps,
  CheckboxProps,
} from 'semantic-ui-react';
import {
  requestMemberByDepartmentCode,
  requestMysuniUser,
  requestRecommendPlaylist,
  requestScrollMysuniUser,
} from './playlistRecommendPopUp.request';
import {
  getCheckedMemberList,
  getFollowerList,
  getMySuniUsers,
  getDepartmentMembers,
  setCheckedMemberList,
  setIsOpenPlaylistRecommendPopUp,
  setMySuniUsers,
  setSelcetedDepartmentCode,
  getSelcetedDepartmentCode,
  getMySuniUserTotalCount,
} from './playlistRecommendPopUp.store';
import { onAllCheckMember, onCheckMember } from './helper/onCheckMember';
import { getMyPagePlaylistDetail } from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.services';
import { textValidationCheck } from './helper/textValidationCheck';
import { clearRetrieveDepartmentsCache } from 'approval/department/present/apiclient/DepartmentApi';
import { trim } from 'lodash';
import { reactAlert } from '@nara.platform/accent';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

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
  const checkedMemberList = getCheckedMemberList();
  const denizenIds = checkedMemberList.map((member) => member.id);
  const playlistId = getMyPagePlaylistDetail()?.playlistId || '';

  if (checkedMemberList.length === 0) {
    reactAlert({
      title: getPolyglotText('Playlist 추천하기', 'playlist-popup-추천하기'),
      message: getPolyglotText(
        'Playlist를 추천할 구성원을 선택해주세요.',
        'playlist-popup-추천구성원'
      ),
    });
    return;
  }

  if (trim(recommendation).length === 0) {
    reactAlert({
      title: getPolyglotText('Playlist 추천하기', 'playlist-popup-추천하기'),
      message: getPolyglotText(
        '추천할 메세지 내용을 입력해주세요.',
        'playlist-popup-추천메세지'
      ),
    });
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

// 팔로워 멤버 체크 선택/해제
export function onCheckFollower(_: React.MouseEvent, data: CheckboxProps) {
  const memberId = data.value as string;
  const isChecked = data.checked || false;
  const follower = getFollowerList();

  onCheckMember(memberId, follower, isChecked);
}

// 팔로워 멤버 전체 선택/해제
export function onAllCheckedFollower(_: React.MouseEvent, data: CheckboxProps) {
  const memberList = getFollowerList();
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

// 팔로워 검색
export function onSearchFollower(searchText: string) {
  const followerList = getFollowerList();
  const isValidationChecked = textValidationCheck(searchText);

  if (isValidationChecked) {
    const filteredFollowerList = followerList.filter(
      (member) =>
        member.name.includes(searchText) || member.email.includes(searchText)
    );

    return filteredFollowerList;
  }
}

// mySuni사용자 검색
export function onSearchMySuniUser(searchText: string) {
  const isValidationChecked = textValidationCheck(searchText);

  if (isValidationChecked) {
    return requestMysuniUser(searchText);
  }
}

// mySuni 사용자 스크롤 이벤트
export function onScrollMySuniUser(searchText: string, offset: number) {
  const mySuniUserTotalCount = getMySuniUserTotalCount();

  if (mySuniUserTotalCount >= 100 && offset > 0) {
    requestScrollMysuniUser(searchText, offset);
  }
}

// 부서 구성원 검색
export function onSearchDepartmentMember(searchText: string) {
  const isValidationChecked = textValidationCheck(searchText);
  const departmentCode = getSelcetedDepartmentCode();

  if (isValidationChecked) {
    requestMemberByDepartmentCode(departmentCode, searchText);
  }
}

// 조직도에서 부서 선택
export function onClickDepartment(
  _: React.MouseEvent,
  data: AccordionTitleProps
) {
  const departmentCode = data.departmentCode as string;

  setSelcetedDepartmentCode(departmentCode);
  requestMemberByDepartmentCode(departmentCode);
}
