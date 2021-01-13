import { CommunityAdminMenu } from 'community/viewModel/CommunityAdminMenu';
import { CommunityProfileBookmark, getEmtpyCommunityProfileBookmark } from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityAdminMenu,
    onCommunityAdminMenu,
    getCommunityAdminMenu,
    useCommunityAdminMenu
] = createStore<CommunityAdminMenu>();


export {
    setCommunityAdminMenu,
    onCommunityAdminMenu,
    getCommunityAdminMenu,
    useCommunityAdminMenu
}