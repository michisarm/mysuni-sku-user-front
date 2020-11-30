import { followModal } from '../../../api/communityApi';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';
import {
  setFollowModal,
  getFollowModal,
} from '../../../store/CommunityFollowModalStore';

export function requestFollowModal() {
  followModal().then(lists => {
    console.log('modal lists', lists);

    const followMadalIntro = getFollowModal() || {
      communities: [],
      communitiesTotalCount: 0,
    }
    if (lists === undefined) {
      setFollowModal({
        ...followMadalIntro,
        communities: [],
        posts:[],
        // communitiesTotalCount: 0,
      });
    }
    else {
      setFollowModal({
        ...followMadalIntro,
        communities: [],
        posts:[],
        // communitiesTotalCount: 0,
      });
    }
  })
}