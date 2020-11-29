import { followModal } from '../../../api/communityApi';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';
import {
  setFollowModal,
  getFollowModal,
} from '../../../store/CommunityFollowModalStore';

export function requestFollowModal() {
  followModal().then(lists => {
    console.log('modal lists', lists);

    const followCommunityIntro = getFollowModal() || {
      communities: [],
      communitiesTotalCount: 0,
    }
    if (lists === undefined) {
      setFollowModal({
        ...followCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
      });
    }
    else {
      setFollowModal({
        ...followCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
      });
    }
  })
}