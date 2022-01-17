import { UserIdentities } from 'playlist/data/models/UserIdentities';
import { createStore } from 'restoa';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

export interface RecommendMemberPopUp {
  denizedId: string;
  name: string;
  email: string;
  departmentName: string;
  companyName: string;
  thumbnailImage: string;
}

export function userIdentitiesToMemberList(userIdentities: UserIdentities[]) {
  const memberList = userIdentities.map((user) => {
    return {
      denizedId: user.id,
      name: parsePolyglotString(user.name),
      email: user.email,
      departmentName: parsePolyglotString(user.departmentName),
      companyName: parsePolyglotString(user.companyName),
      thumbnailImage: '',
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
