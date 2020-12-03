import { CommunityMemberList } from 'community/model/CommunityMember';
import { createStore } from './Store';

// 전체멤버 조회
const [
  setCommunityMember,
  onCommunityMember,
  getCommunityMember,
  useCommunityMember
] = createStore<CommunityMemberList>();

// 검색멤버 조회
const [
  setSearchMember,
  onSearchMember,
  getSearchMember,
  useSearchMember
] = createStore<CommunityMemberList>();

export {
  setCommunityMember,
  onCommunityMember,
  getCommunityMember,
  useCommunityMember,
  setSearchMember,
  onSearchMember,
  getSearchMember,
  useSearchMember
 }
