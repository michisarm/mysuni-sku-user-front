import { CommunityGroupMemberList } from 'community/model/CommunityMemberGroup';
import { createStore } from './Store';

const [
  setCommunityGroupMember,
  onCommunityGroupMember,
  getCommunityGroupMember,
  useCommunityGroupMember
] = createStore<CommunityGroupMemberList>();

export {
        setCommunityGroupMember,
        onCommunityGroupMember,
        getCommunityGroupMember,
        useCommunityGroupMember
       }