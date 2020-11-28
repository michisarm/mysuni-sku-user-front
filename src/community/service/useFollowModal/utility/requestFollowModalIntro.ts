import { followModal } from '../../../api/communityApi';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';

export function requestFollowModal() {
  followModal().then(lists => {
    console.log('modal lists', lists);
  })
}