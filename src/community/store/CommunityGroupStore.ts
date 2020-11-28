
import { CommunityGroup } from 'community/model/CommunityMemberGroup';
import { createStore } from './Store';

const [
  setCommunityGroup,
  onCommunityGroup,
  getCommunityGroup,
  useCommunityGroup
] = createStore<CommunityGroup>();

export {
        setCommunityGroup,
        onCommunityGroup,
        getCommunityGroup,
        useCommunityGroup
       }