import moment from "moment";
import { findAllMyCommunities, findAllPostsFromMyCommunities } from "../../../api/communityApi";
import Community from "../../../model/Community";
import Post from "../../../model/Post";
import { getMyCommunityIntro, setMyCommunityIntro } from "../../../store/CommunityMainStore";
import CommunityItem from "../../../viewModel/MyCommunityIntro/CommunityItem";
import PostItem from "../../../viewModel/MyCommunityIntro/PostItem";

function communityToItem(community:Community):CommunityItem {
    const {communityId, thumbnailId,name,managerName, memberCount} = community;
    return {
        communityId,
        image:thumbnailId,
        name,
        hasNewPost:false,
        manager:managerName,
        memberCount
    }
}

export function requestMyCommunityList() {
    findAllMyCommunities().then(communities=>{
        const myCommunityIntro = getMyCommunityIntro() || {communities:[], posts:[], communitiesTotalCount:0, postsTotalCount:0};
        if(communities === undefined){
            setMyCommunityIntro({...myCommunityIntro,communities:[], communitiesTotalCount:0})
        } else {
            setMyCommunityIntro({...myCommunityIntro,communities:communities.results.map(communityToItem), communitiesTotalCount:communities.totalCount})
        }
    })
}


function postToItem(post:Post):PostItem {
    const {postId, communityId,menuId,title, html, createdTime} = post;
    return {
        postId,
        communityName:"",
        profileImage:"",
        profileId:"",
        createTime:moment(createdTime).format('YYYY.MM.DD'),
        name:title,
        contents:html,
    }
}


export function requestMyCommunityPostList() {
    findAllPostsFromMyCommunities().then(posts=>{
        const myCommunityIntro = getMyCommunityIntro() || {communities:[], posts:[], communitiesTotalCount:0, postsTotalCount:0};
        if(posts === undefined){
            setMyCommunityIntro({...myCommunityIntro,posts:[], postsTotalCount:0})
        } else {
            setMyCommunityIntro({...myCommunityIntro,posts:posts.results.map(postToItem), postsTotalCount:posts.totalCount})
        }
    })
}