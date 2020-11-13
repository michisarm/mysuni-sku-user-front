import {CommunityProfileMyCommunity} from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityMyCommunityItem, 
    onCommunityMyCommunityItem, 
    getCommunityMyCommunityItem
] = createStore<CommunityProfileMyCommunity>();

export {
    setCommunityMyCommunityItem,
    onCommunityMyCommunityItem,
    getCommunityMyCommunityItem,
}