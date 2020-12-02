import { CommunityProfileBookmark, getEmtpyCommunityProfileBookmark } from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityProfileBookmark,
    onCommunityProfileBookmark,
    getCommunityProfileBookmark,
    useCommunityProfileBookmark
] = createStore<CommunityProfileBookmark>(getEmtpyCommunityProfileBookmark());


export {
    setCommunityProfileBookmark,
    onCommunityProfileBookmark,
    getCommunityProfileBookmark,
    useCommunityProfileBookmark
}