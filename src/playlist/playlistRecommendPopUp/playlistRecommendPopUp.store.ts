import { createStore } from 'restoa';
import Profile from 'community/ui/data/community/models/Profile';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { UserIdentities } from 'community/ui/data/community/models/UserIdentities';

export interface MemberList {
  id: string;
  name: string;
  email: string;
  departmentName: string;
  companyName: string;
  thumbnailImagePath: string;
}

export function UserIdentitiesToMemberList(
  sameDepartmentUsers: UserIdentities[]
): MemberList[] {
  const departmentMembers = sameDepartmentUsers.map((user) => {
    return {
      id: user.denizenId,
      name: user.displayNicknameFirst
        ? user.nickname || parsePolyglotString(user.name)
        : parsePolyglotString(user.name) || user.nickname,
      email: user.email,
      departmentName: parsePolyglotString(user.departmentName),
      companyName: parsePolyglotString(user.companyName),
      thumbnailImagePath: user.photoImagePath,
    };
  });

  return departmentMembers;
}

// following 데이터 memberlist로 변환
export function followingToMemberList(following: Profile[]): MemberList[] {
  const memberList = following.map((member) => {
    return {
      id: member.id,
      name: member.displayNicknameFirst
        ? member.nickname || parsePolyglotString(member.name)
        : parsePolyglotString(member.name) || member.nickname,
      email: member.email,
      departmentName: parsePolyglotString(member.departmentName),
      companyName: parsePolyglotString(member.companyName),
      thumbnailImagePath: member.photoImagePath,
    };
  });

  return memberList;
}

export const [
  useIsOpenPlaylistRecommendPopUp,
  setIsOpenPlaylistRecommendPopUp,
  getIsOpenPlaylistRecommendPopUp,
] = createStore<boolean>(false);

export const [useMySuniUsers, setMySuniUsers, getMySuniUsers] = createStore<
  MemberList[]
>([]);

export const [
  useDepartmentMembers,
  setDepartmentMembers,
  getDepartmentMembers,
] = createStore<MemberList[]>([]);

export const [useFollowingList, setFollowingList, getFollowingList] =
  createStore<MemberList[]>([]);

export const [
  useCheckedMemberList,
  setCheckedMemberList,
  getCheckedMemberList,
] = createStore<MemberList[]>([]);
