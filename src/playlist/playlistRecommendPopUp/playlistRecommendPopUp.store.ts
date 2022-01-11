import { createStore } from 'restoa';
import Profile from 'community/ui/data/community/models/Profile';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export interface MemberList {
  id: string;
  name: string;
  email: string;
  departmentName: string;
  thumbnailImagePath: string;
}

// following 데이터 memberlist로 변환
export function followingToMemberList(following: Profile[]): MemberList[] {
  const memberList = following.map((member) => {
    return {
      id: member.id,
      name: parsePolyglotString(member.name),
      email: member.email,
      departmentName: parsePolyglotString(member.departmentName),
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

export const [useMySuniUser, setMySuniUser, getMySuniUser] = createStore<
  MemberList[]
>([]);

export const [useDepartmentMember, setDepartmentMember, getDepartmentMember] =
  createStore<MemberList[]>([]);

export const [useFollowingList, setFollowingList, getFollowingList] =
  createStore<MemberList[]>([]);

export const [
  useCheckedMemberList,
  setCheckedMemberList,
  getCheckedMemberList,
] = createStore<MemberList[]>([]);

export const [useRecommendation, setRecommendation, getRecommendation] =
  createStore<string>('');
