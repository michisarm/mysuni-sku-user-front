import { CommunityAdminMenu, GroupList } from 'community/viewModel/CommunityAdminMenu';
import { CommunityProfileBookmark, getEmtpyCommunityProfileBookmark } from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityAdminGroupsStore,
    onCommunityAdminGroupsStore,
    getCommunityAdminGroupsStore,
] = createStore<GroupList>();


export {
    setCommunityAdminGroupsStore,
    onCommunityAdminGroupsStore,
    getCommunityAdminGroupsStore,
}