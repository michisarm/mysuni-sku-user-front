import { CommunityPostDetail } from 'community/viewModel/CommunityPostDetail';
import { createStore } from './Store';


const [
    setCommunityPostDetailItem, 
    onCommunityPostDetailItem, 
    getCommunityPostDetailItem
] = createStore<CommunityPostDetail>();

export {
    setCommunityPostDetailItem, 
    onCommunityPostDetailItem, 
    getCommunityPostDetailItem
}