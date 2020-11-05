import CommunityProfile from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityProfile, 
    onCommunityProfile, 
    getCommunityProfile
] = createStore<CommunityProfile>();

export {
    setCommunityProfile,
    onCommunityProfile,
    getCommunityProfile,
}