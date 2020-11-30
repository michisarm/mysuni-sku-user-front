
import { CommunityMemberApproveList } from 'community/model/CommunityMember';
import { createStore } from './Store';

// 가입대기 멤버 조회

const [
  setCommunityMemberApprove,
  onCommunityMemberApprove,
  getCommunityMemberApprove,
  useCommunityMemberApprove
] = createStore<CommunityMemberApproveList>();

export {
        setCommunityMemberApprove,
        onCommunityMemberApprove,
        getCommunityMemberApprove,
        useCommunityMemberApprove
       }
