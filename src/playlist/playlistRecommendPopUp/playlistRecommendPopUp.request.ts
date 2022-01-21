import requestMyPagePlaylistDetail from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.request';
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
  setDepartmentMembers,
  setFollowingList,
  useIsOpenPlaylistRecommendPopUp,
  setMySuniUsers,
  setOrganizationChartTree,
  departmentChartToOrganiztionChartTree,
  userIdentitiesToMemberList,
  MembersByDepartmentCodeToMemberList,
  setSelcetedDepartmentCode,
  setSelectedDepartmentName,
} from './playlistRecommendPopUp.store';
import { SkProfileService } from 'profile/stores';
import { patronInfo } from '@nara.platform/dock';
import { retrieveDepartmentsCache } from 'approval/department/present/apiclient/DepartmentApi';
import {
  findDefaultIndexByDepartmentCode,
  findMembersByDepartmentCode,
} from 'lecture/detail/api/approvalApi';

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
  })
    .then(() => {
      onClosePlaylistRecommendPopUp();
    })
    .then(() => {
      requestMyPagePlaylistDetail(playlistId);
    });
}

// department Code로 구성원 호출
export async function requestMemberByDepartmentCode(departmentCode: string) {
  const memberByDepartmentCode = await findMembersByDepartmentCode(
    departmentCode
  );

  if (memberByDepartmentCode !== undefined) {
    const departmentMembers = MembersByDepartmentCodeToMemberList(
      memberByDepartmentCode
    );
    setDepartmentMembers(departmentMembers);
    setSelectedDepartmentName(departmentMembers[0].departmentName);
  }
}

// 소속 부서 구성원 tab 데이터 호출
export async function requestDepartMentUser(searchWord: string) {
  const sameDepartmentUsers = await findSameDepartmentUserIdentities(
    searchWord
  );
  if (sameDepartmentUsers !== undefined) {
    const departmentMembers = userIdentitiesToMemberList(sameDepartmentUsers);
    setDepartmentMembers(departmentMembers);
  }
}

// MySuni tab 데이터 호출
export async function requestMysuniUser(searchWord: string) {
  const mySuniUserIdentities = await findUserIdentitiesByKeyword(searchWord);

  if (mySuniUserIdentities !== undefined) {
    const mySuniUsers = userIdentitiesToMemberList(mySuniUserIdentities);
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

// 조직도 정보 불러오기
export async function requestDepartmentChart() {
  const companyCode = `SK_-_${SkProfileService.instance.skProfile.companyCode}`;
  const departmentCode = SkProfileService.instance.skProfile.departmentCode;
  const cineroomId = patronInfo.getCineroomId();

  const departments = await retrieveDepartmentsCache(companyCode);
  const defaultIndexByDepartmentCode =
    (await findDefaultIndexByDepartmentCode(departmentCode)) || {};

  if (departments !== undefined) {
    requestMemberByDepartmentCode(departmentCode);
    setOrganizationChartTree(
      departmentChartToOrganiztionChartTree(
        departments,
        defaultIndexByDepartmentCode
      )
    );
  }
  // // 모든 부서 정보를 다 불러온다.
  // if (cineroomId === 'ne1-m2-c2') {
  // } else {
  //   // 나의 부서정보를 불러온다.
  // }
}

export function useRequestDepartMentUser() {
  const isOpen = useIsOpenPlaylistRecommendPopUp();

  useEffect(() => {
    if (isOpen) {
      requestDepartmentChart();
    }
    return () => {
      setDepartmentMembers([]);
      setSelcetedDepartmentCode('');
    };
  }, [isOpen]);
}

export function useRequestFollowing() {
  useEffect(() => {
    requestFollowing();
  }, []);
}
