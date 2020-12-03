import { MemberList } from 'community/model/CommunityMember';
import { createStore } from './Store';

const [
  setFollowMember,
  onFollowMember,
  getFollowMember,
  useFollowMember
] = createStore<MemberList>();

const [
  setDelFollowMember,
  onDelFollowMember,
  getDelFollowMember,
  useDelFollowMember
] = createStore<MemberList>();

export {
        setFollowMember,
        onFollowMember,
        getFollowMember,
        useFollowMember,
        setDelFollowMember,
        onDelFollowMember,
        getDelFollowMember,
        useDelFollowMember
       }