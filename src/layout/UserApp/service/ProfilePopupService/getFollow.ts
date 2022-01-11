import { findAllFollow } from 'community/ui/data/community/apis/followApi';
import { setFollowModel } from '../../store/FollowStore';

export async function getFollow() {
  const followData = await findAllFollow();

  if (followData !== undefined) {
    setFollowModel(followData);
  }
}
