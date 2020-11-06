import {CommunityProfile} from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityProfileItem, 
    onCommunityProfileItem, 
    getCommunityProfileItem
] = createStore<CommunityProfile>();

export {
    setCommunityProfileItem,
    onCommunityProfileItem,
    getCommunityProfileItem,
}