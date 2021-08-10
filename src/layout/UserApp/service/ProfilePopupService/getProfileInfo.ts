import { setProfileInfoModel, ProfileInfo } from '../../store/ProfileInfoStore';
import {
  findBadgesByBadgeIssueState,
  findAllOtherCommunities,
  findAllPostViewsFromProfileFeed,
  findFollowWithFollowingCount,
} from '../../api/ProfileInfoAPI';
import { findUserProfile } from 'profile/present/apiclient/SkProfileApi';

export async function getProfileInfo(
  memberId: string | undefined
): Promise<void> {
  if (memberId !== undefined) {
    const profileInfo = await findUserProfile(memberId);
    const followWithFollowingCount = await findFollowWithFollowingCount();

    if (profileInfo && profileInfo !== undefined && profileInfo !== null) {
      const parseProfileInfo: ProfileInfo = {
        ...profileInfo,
        followCount: followWithFollowingCount?.followerCount || 0,
        followingCount: followWithFollowingCount?.followingCount || 0,
        photoImagePath: profileInfo.useGdiPhoto
          ? profileInfo.gdiPhotoImagePath
          : profileInfo.photoImagePath,
      };

      setProfileInfoModel(parseProfileInfo);
    }
  }
}

export async function getProfileCount(
  memberId: string | undefined,
  startDate: string,
  endDate: string
) {
  const memberIdValue = memberId === undefined ? '' : memberId;

  const badgeData = await findBadgesByBadgeIssueState(
    memberIdValue,
    startDate,
    endDate
  );
  const communityView = await findAllOtherCommunities(
    memberIdValue,
    'createdTime',
    0
  );
  const postView = await findAllPostViewsFromProfileFeed(memberIdValue, 0);

  const result = {
    badgeCount: badgeData?.totalCount,
    communityCount: communityView?.totalCount,
    postCount: postView?.totalCount,
  };

  return result;
}
