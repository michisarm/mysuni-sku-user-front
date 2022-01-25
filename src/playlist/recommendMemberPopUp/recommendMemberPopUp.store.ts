import { UserIdentities } from 'playlist/data/models/UserIdentities';
import { createStore } from 'restoa';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export interface RecommendMemberPopUp {
  denizedId: string;
  name: string;
  email: string;
  departmentName: string;
  companyName: string;
  photoImagePath: string;
}

export function userIdentitiesToMemberList(userIdentities: UserIdentities[]) {
  const memberList = userIdentities.map((user) => {
    return {
      denizedId: user.id,
      name: user.displayNicknameFirst
        ? user.nickname || parsePolyglotString(user.name)
        : parsePolyglotString(user.name) || user.nickname,
      email: user.email,
      departmentName: parsePolyglotString(user.departmentName),
      companyName: parsePolyglotString(user.companyName),
      photoImagePath: user.photoImagePath,
    };
  });

  return memberList;
}

export const [
  useRecommendMemberPopUp,
  setRecommendMemberPopUp,
  getRecommendMemberPopUp,
] = createStore<RecommendMemberPopUp[]>([]);

export const [
  useIsOpenRecommendMemberPopUp,
  setIsOpenRecommendMemberPopUp,
  getIsOpenRecommendMemberPopUp,
] = createStore<boolean>(false);
