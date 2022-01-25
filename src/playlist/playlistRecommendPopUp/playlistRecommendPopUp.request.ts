import { getPolyglotText } from 'shared/ui/logic/PolyglotText';
import { reactAlert } from '@nara.platform/accent';
import requestMyPagePlaylistDetail from 'myTraining/ui/view/playlist/myPagePlaylistDetail/MyPagePlaylistDetail.request';
import { getDenizedId } from 'community/ui/app.formatters';
import { findFollowerUsers } from 'community/ui/data/community/apis/followApi';
import { findUserIdentitiesByKeyword } from 'community/ui/data/community/apis/profilesApi';
import { recommendPlaylist } from 'playlist/data/apis';
import { useEffect } from 'react';
import { onClosePlaylistRecommendPopUp } from './playlistRecommendPopUp.events';
import {
  followingToMemberList,
  setDepartmentMembers,
  setFollowerList,
  useIsOpenPlaylistRecommendPopUp,
  setIsOpenPlaylistRecommendPopUp,
  setMySuniUsers,
  setOrganizationChartTree,
  departmentChartToOrganiztionChartTree,
  userIdentitiesToMemberList,
  MembersByDepartmentCodeToMemberList,
  setSelcetedDepartmentCode,
  setCompanyName,
} from './playlistRecommendPopUp.store';
import { SkProfileService } from 'profile/stores';
import {
  findMembersByDepartmentCodeCache,
  retrieveDepartmentsCache,
} from 'approval/department/present/apiclient/DepartmentApi';
import {
  findCompanyCahche,
  findDefaultIndexByDepartmentCodeCache,
} from 'lecture/detail/api/approvalApi';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

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
      reactAlert({
        title: getPolyglotText('Playlist 추천하기', 'playlist-popup-추천하기'),
        message: getPolyglotText(
          '선택한 구성원들에게 Playlist가 추천되었습니다.',
          'playlist-popup-추천컨펌'
        ),
      });
    })
    .then(() => {
      requestMyPagePlaylistDetail(playlistId);
    });
}

// department Code로 구성원 호출
export async function requestMemberByDepartmentCode(
  departmentCode: string,
  keyword?: string
) {
  const memberByDepartmentCode = await findMembersByDepartmentCodeCache(
    departmentCode,
    keyword
  );

  if (memberByDepartmentCode !== undefined) {
    const myId = SkProfileService.instance.additionalUserInfo.id;
    const filteredMemberByDepartmentCode = memberByDepartmentCode.filter(
      (member) => member.id !== myId
    );

    const departmentMembers = MembersByDepartmentCodeToMemberList(
      filteredMemberByDepartmentCode
    );
    setDepartmentMembers(departmentMembers);
  }
}

// MySuni tab 데이터 호출
export async function requestMysuniUser(searchWord: string) {
  const mySuniUserIdentities = await findUserIdentitiesByKeyword(searchWord);

  if (mySuniUserIdentities !== undefined) {
    const myId = SkProfileService.instance.additionalUserInfo.id;
    const filteredMySuniUserIdentities = mySuniUserIdentities.filter(
      (user) => user.id !== myId
    );

    const mySuniUsers = userIdentitiesToMemberList(
      filteredMySuniUserIdentities
    );
    setMySuniUsers(mySuniUsers);
  }
}

// following tab 데이터 호출
export async function requestFollower() {
  const memberId = getDenizedId();
  const followerUser = await findFollowerUsers(memberId);

  if (followerUser !== undefined) {
    const memberList = followingToMemberList(followerUser.results);
    setFollowerList(memberList);
  }
}

// 조직도 정보 불러오기
export async function requestDepartmentChart() {
  const companyCode = `SK_-_${SkProfileService.instance.skProfile.companyCode}`;
  const departmentCode = SkProfileService.instance.skProfile.departmentCode;

  const departments = await retrieveDepartmentsCache(companyCode);
  const defaultIndexByDepartmentCode =
    (await findDefaultIndexByDepartmentCodeCache(departmentCode)) || {};

  if (departments !== undefined) {
    requestCompanyName(companyCode);
    requestMemberByDepartmentCode(departmentCode);
    setOrganizationChartTree(
      departmentChartToOrganiztionChartTree(
        departments,
        defaultIndexByDepartmentCode
      )
    );
  }
}

// 회사이름 불러오기
export async function requestCompanyName(companyCode: string) {
  const companyName = await findCompanyCahche(companyCode);

  if (companyName !== undefined) {
    setCompanyName(parsePolyglotString(companyName.name));
  }
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

export function useRequestFollower() {
  useEffect(() => {
    requestFollower();
  }, []);
}
