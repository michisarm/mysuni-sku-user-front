import { CommunityHomeCreateItem } from '../viewModel/CommunityHomeCreate'
import { createStore } from './Store';

const [
    setCommunityHomeCreateItem, 
    onCommunityHomeCreateItem, 
    getCommunityHomeCreateItem,
    useCommunityHomeCreateItem
] = createStore<CommunityHomeCreateItem>();

export {
    setCommunityHomeCreateItem,
    onCommunityHomeCreateItem,
    getCommunityHomeCreateItem,
    useCommunityHomeCreateItem
}

