import { CommunityProfileMyCommunity } from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityProfileMyCommunity,
    onCommunityProfileMyCommunity,
    getCommunityProfileMyCommunity,
    useCommunityProfileMyCommunity
] = createStore<CommunityProfileMyCommunity>();

export {
    setCommunityProfileMyCommunity,
    onCommunityProfileMyCommunity,
    getCommunityProfileMyCommunity,
    useCommunityProfileMyCommunity
}