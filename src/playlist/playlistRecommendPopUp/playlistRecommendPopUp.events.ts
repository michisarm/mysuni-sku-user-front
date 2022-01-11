import { CheckboxProps } from 'semantic-ui-react';
import { requestRecommendPlaylist } from './playlistRecommendPopUp.request';
import {
  getCheckedMemberList,
  getRecommendation,
  getFollowingList,
  MemberList,
  setCheckedMemberList,
  setFollowingList,
  setIsOpenPlaylistRecommendPopUp,
} from './playlistRecommendPopUp.store';
import { onCheckMember } from './helper/onCheckMember';

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

// 팔로우 멤버 체크 선택/해제
export function onCheckFollowing(_: React.MouseEvent, data: CheckboxProps) {
  const memberId = data.id as string;
  const following = getFollowingList();

  onCheckMember(memberId, following);
}

// 팔로우 멤버 체크 전체선택
export function onAllCheckedMember() {
  const checkedMemberList = getCheckedMemberList();
  const memberList = getFollowingList();
  setCheckedMemberList([...checkedMemberList, ...memberList]);
}

// 플레이리스트 추천맴버 전체삭제
export function onClickAllClearCheckedMember() {
  setCheckedMemberList([]);
}

// 팔로잉 검색
export function onSearchFollowing(searchText: string) {
  const memberList = getFollowingList();

  const filteredMemberList = memberList.filter(
    (member) =>
      member.name.includes(searchText) || member.email.includes(searchText)
  );

  setFollowingList(filteredMemberList);
}

// 소속 부서 구성원, mySuni사용자 검색
export function onSearchUser(searchText: string) {}
