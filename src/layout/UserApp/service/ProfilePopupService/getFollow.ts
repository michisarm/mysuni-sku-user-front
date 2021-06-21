import { patronInfo } from '@nara.platform/dock';
import { MyBadge } from '../../../../certification/model/MyBadge';
import { findAllFollow } from '../../api/ProfileInfoAPI';
import { FollowModel } from '../../model/FollowModel';
import { setFollowModel } from '../../store/FollowStore';

export async function getFollow() {
  const followData = await findAllFollow();

  const result: FollowModel = {
    ids: [],
  };

  if (followData !== undefined) {
    result.ids = followData;
  }
  setFollowModel(result);
}

