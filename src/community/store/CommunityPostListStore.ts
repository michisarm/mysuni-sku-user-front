import { CommunityPostList } from 'community/viewModel/CommunityPostList';
import { createStore } from './Store';

const [
    setCommunityPostListItem, 
    onCommunityPostListItem, 
    getCommunityPostListItem
] = createStore<CommunityPostList>();

export {
    setCommunityPostListItem,
    onCommunityPostListItem,
    getCommunityPostListItem,
}