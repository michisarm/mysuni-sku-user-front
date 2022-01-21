import { createStore } from 'restoa';
import Profile from 'community/ui/data/community/models/Profile';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { UserIdentities } from 'community/ui/data/community/models/UserIdentities';
import { DepartmentChartModel } from 'approval/department/model/DepartmentModel';
import { MemberByDepartmentCode } from 'lecture/detail/model/MemberByDepartmentCode';

export interface MemberList {
  id: string;
  name: string;
  email: string;
  departmentName: string;
  companyName: string;
  thumbnailImagePath: string;
}

/**
 *  @param id 해당 id 값은 chartId
 */
export interface ChartItem {
  name: string;
  id: string;
  code: string;
  parentCode: string;
  hasChildren: boolean;
  defaultIndex?: number;
}

export interface Panel {
  title: {
    content: JSX.Element;
    icon: string;
    departmentId?: string;
    departmentCode?: string;
  };
  content: {
    content: JSX.Element;
  };
}

// 조직도 구성원 데이터를 memberList로 변환
export function MembersByDepartmentCodeToMemberList(
  memberByDepartmentCode: MemberByDepartmentCode[]
): MemberList[] {
  const departmentMembers = memberByDepartmentCode.map((user) => {
    return {
      id: user.id,
      name: parsePolyglotString(user.name),
      email: user.email,
      departmentName: parsePolyglotString(user.departmentName),
      companyName: parsePolyglotString(user.companyName),
      thumbnailImagePath: `/profile/photo/${user.photoFileUrl}`,
    };
  });

  return departmentMembers;
}

// Mysuni 구성원 데이터 memberList로 변환
export function userIdentitiesToMemberList(
  sameDepartmentUsers: UserIdentities[]
): MemberList[] {
  const departmentMembers = sameDepartmentUsers.map((user) => {
    return {
      id: user.id,
      name: user.displayNicknameFirst
        ? user.nickname
        : parsePolyglotString(user.name),
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

// 조직도 객체 panel 에 맞도록 변경
export function departmentChartToOrganiztionChartTree(
  departments: DepartmentChartModel[],
  defaultIndex: { [key: string]: number }
): ChartItem[] {
  const organizationChartTree: ChartItem[] = departments.map((department) => {
    return {
      name: parsePolyglotString(department.name),
      id: department.chartId,
      code: department.code,
      parentCode: department.parentCode,
      hasChildren: departments.some(
        (item) => item.parentCode === department.code
      ),
      defaultIndex: defaultIndex[department.code],
    };
  });

  return organizationChartTree;
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

export const [useFollowerList, setFollowerList, getFollowerList] = createStore<
  MemberList[]
>([]);

export const [
  useCheckedMemberList,
  setCheckedMemberList,
  getCheckedMemberList,
] = createStore<MemberList[]>([]);

export const [
  useOrganizationChartTree,
  setOrganizationChartTree,
  getOrganizationChartTree,
] = createStore<ChartItem[]>([]);

export const [
  useSelcetedDepartmentCode,
  setSelcetedDepartmentCode,
  getSelcetedDepartmentCode,
] = createStore<string>('');

export const [
  useSelectedDepartmentName,
  setSelectedDepartmentName,
  getSelectedDepartmentName,
] = createStore<string>('');
