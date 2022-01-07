import { createStore } from 'restoa';

export interface MemberList {
  id: string;
  name: string;
  email: string;
  departmentName: string;
  thumbnailImagePath: string;
}

export const [
  useIsOpenPlaylistRecommendPopUp,
  setIsOpenPlaylistRecommendPopUp,
  getIsOpenPlaylistRecommendPopUp,
] = createStore<boolean>(false);

export const [useMemberList, setMemberList, getMemberList] = createStore<
  MemberList[]
>([]);

export const [
  useCheckedMemberList,
  setCheckedMemberList,
  getCheckedMemberList,
] = createStore<MemberList[]>([]);

export const [useRecommendation, setRecommendation, getRecommendation] =
  createStore<string>('');
