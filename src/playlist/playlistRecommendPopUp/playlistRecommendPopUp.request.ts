import { getDenizedId } from 'community/ui/app.formatters';
import { findFollowingUsers } from 'community/ui/data/community/apis/followApi';
import {
  findSameDepartmentUserIdentities,
  findUserIdentitiesByKeyword,
} from 'community/ui/data/community/apis/profilesApi';
import { recommendPlaylist } from 'playlist/data/apis';
import { useEffect } from 'react';
import { onClosePlaylistRecommendPopUp } from './playlistRecommendPopUp.events';
import {
  followingToMemberList,
  UserIdentitiesToMemberList,
  setDepartmentMembers,
  setFollowingList,
  useIsOpenPlaylistRecommendPopUp,
  setMySuniUsers,
} from './playlistRecommendPopUp.store';

// 플레이리스트 추천
export function requestRecommendPlaylist(
  denizenIds: string[],
  playlistId: string,
  recommendation: string
) {
  recommendPlaylist({
    denizenIds,
    playlistId,
    recommendation,
  }).then(() => {
    onClosePlaylistRecommendPopUp();
  });
}

// 소속 부서 구성원 tab 데이터 호출
export async function requestDepartMentUser(searchWord: string) {
  const sameDepartmentUsers = await findSameDepartmentUserIdentities(
    searchWord
  );

  if (sameDepartmentUsers !== undefined) {
    const departmentMembers = UserIdentitiesToMemberList(sameDepartmentUsers);
    setDepartmentMembers(departmentMembers);
  }
}

// MySuni tab 데이터 호출
export async function requestMysuniUser(searchWord: string) {
  const mySuniUserIdentities = await findUserIdentitiesByKeyword(searchWord);

  if (mySuniUserIdentities !== undefined) {
    const mySuniUsers = UserIdentitiesToMemberList(mySuniUserIdentities);
    setMySuniUsers(mySuniUsers);
  }
}

// following tab 데이터 호출
export async function requestFollowing() {
  const memberId = getDenizedId();
  const followingUser = await findFollowingUsers(memberId);

  if (followingUser !== undefined) {
    const memberList = followingToMemberList(followingUser.results);
    setFollowingList(memberList);
  }
}

export function useRequestDepartMentUser() {
  const isOpen = useIsOpenPlaylistRecommendPopUp();

  useEffect(() => {
    if (isOpen) {
      requestDepartMentUser('');
    }
  }, [isOpen]);
}

export function useRequestFollowing() {
  useEffect(() => {
    requestFollowing();
  }, []);
}
