import { followersModal } from '../../../api/communityApi';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';
import {
  setFollowModal,
  getFollowModal,
} from '../../../store/CommunityFollowModalStore';

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
      });
    }
    else {
      // const next: FollowModalItem[] = [];
      setFollowModal({
        ...lists,
        communities: [],
        posts: [],
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