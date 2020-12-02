import { CommunityProfileMyCommunity } from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityProfileCommunity,
    onCommunityProfileCommunity,
    getCommunityProfileCommunity,
    useCommunityProfileCommunity
] = createStore<CommunityProfileMyCommunity>();

export {
    setCommunityProfileCommunity,
    onCommunityProfileCommunity,
    getCommunityProfileCommunity,
    useCommunityProfileCommunity
}