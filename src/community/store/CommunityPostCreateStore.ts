import { CommunityPostCreateItem } from '../viewModel/CommunityPostCreate'
import { createStore } from './Store';

const [
    setCommunityPostCreateItem, 
    onCommunityPostCreateItem, 
    getCommunityPostCreateItem
] = createStore<CommunityPostCreateItem>();

export {
    setCommunityPostCreateItem,
    onCommunityPostCreateItem,
    getCommunityPostCreateItem,
}