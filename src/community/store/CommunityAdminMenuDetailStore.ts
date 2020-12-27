import { CommunityAdminMenu, getEmtpyCommunityAdminMenu } from 'community/viewModel/CommunityAdminMenu';
import { CommunityProfileBookmark, getEmtpyCommunityProfileBookmark } from 'community/viewModel/CommunityProfile';
import { createStore } from './Store';

const [
    setCommunityAdminMenuDetail,
    onCommunityAdminMenuDetail,
    getCommunityAdminMenuDetail,
] = createStore<CommunityAdminMenu>();


export {
    setCommunityAdminMenuDetail,
    onCommunityAdminMenuDetail,
    getCommunityAdminMenuDetail,
}

// import { CommunityPostDetail } from 'community/viewModel/CommunityPostDetail';
// import { createStore } from './Store';


// const [
//     setCommunityPostDetailItem, 
//     onCommunityPostDetailItem, 
//     getCommunityPostDetailItem
// ] = createStore<CommunityPostDetail>();

// export {
//     setCommunityPostDetailItem, 
//     onCommunityPostDetailItem, 
//     getCommunityPostDetailItem
// }