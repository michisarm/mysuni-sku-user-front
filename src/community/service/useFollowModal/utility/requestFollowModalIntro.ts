import { followersModal, followList } from '../../../api/communityApi';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';
import {
  setFollowModal,
  getFollowModal,
} from '../../../store/CommunityFollowModalStore';
import CommunityFollowModalIntro from 'community/viewModel/FollowModalIntro/CommunityFollowModalIntro';

export function requestFollowModal() {
  followersModal().then(lists => {
    const followMadalIntro = getFollowModal() || {
      communities: [],
      communitiesTotalCount: 0,
    }
    if (lists === undefined) {
      setFollowModal({
        ...followMadalIntro,
        communities: [],
        posts:[],
        communitiesTotalCount: 0,
        results:[]
      });
    }
    else {

      const next: FollowModalItem[] = [];
      followMadalIntro.communities.forEach(community => {
        next.push(community);
      });
 
      
      // const next: FollowModalItem[] = [];
      setFollowModal({
        ...lists,
        communities: next,
        posts: [],
        communitiesTotalCount: 0,
      });
    }
  })
}

export function requestFollowingModal() {
  followList(0, 1000, '').then(lists => {
    const followMadalIntro = getFollowModal() || {
      communities: [],
      posts:[],
      communitiesTotalCount: 0,
    }
    if (lists === undefined) {
      setFollowModal({
        ...followMadalIntro,
        communities: [],
        posts:[],
        communitiesTotalCount: 0,
        results:[]
      });
    }
    else {
      const next: FollowModalItem[] = [];
      followMadalIntro.posts.forEach(community => {
        next.push(community);
      });
 
      // const next: FollowModalItem[] = [];
      setFollowModal({
        ...lists,
        communities: [],
        posts: next,
        communitiesTotalCount: 0,
      });
    }
  })
}



// function postToItem(post: FollowModalItem): FollowModalItem {
//   const { id, nickname, profileImg, follow } = post;
//   return {
//     id,
//     nickname,
//     profileImg,
//     follow,
//   };
// }