import { CommunityProfileFeed, getEmtpyCommunityProfileFeed } from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityProfileFeed,
    onCommunityProfileFeed,
    getCommunityProfileFeed,
    useCommunityProfileFeed
] = createStore<CommunityProfileFeed>(getEmtpyCommunityProfileFeed());


export {
    setCommunityProfileFeed,
    onCommunityProfileFeed,
    getCommunityProfileFeed,
    useCommunityProfileFeed
}