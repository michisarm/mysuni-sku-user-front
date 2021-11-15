import { findUserProfile } from '../data/community/apis/profilesApi';
import {
  setUserProfileInfo,
  setUserCommunityList,
  setUserFeedList,
  setMyFollowList,
} from './userProfileInfo.services';
import { findAllOtherCommunities } from '../data/community/apis/communityViewApi';
import { findAllPostViewsFromProfileFeed } from '../data/community/apis/postviewsApi';
import { findAllFollow } from '../data/community/apis/followApi';
import moment from 'moment';
import { getProfileImage, getTimeString } from '../app.formatters';
import { parsePolyglotString } from '../../packages/polyglot/PolyglotString';
import { findFollowCount } from '../data/community/apis/followApi';

export function initUserProfileInfo() {
  setUserProfileInfo();
  setUserCommunityList();
  setUserFeedList();
}

export async function requestUserProfileInfo(memberId: string) {
  if (memberId !== '') {
    const userProfile = await findUserProfile(memberId);

    const communityList = await findAllOtherCommunities(
      memberId,
      'createdTime',
      0
    );
    const feedList = await findAllPostViewsFromProfileFeed(memberId, 0, 9999);
    const followCount = await findFollowCount(memberId);

    if (userProfile !== undefined) {
      const profileImage = getProfileImage(
        userProfile.photoImagePath,
        userProfile.gdiPhotoImagePath,
        userProfile.useGdiPhoto
      );

      setUserProfileInfo({
        name: parsePolyglotString(userProfile.name),
        nickName: userProfile.nickname,
        selfIntroduction: userProfile.selfIntroduction,
        companyName: parsePolyglotString(userProfile.companyName),
        profileImage,
        backGrounImage: userProfile.backgroundImagePath,
        followerCount: followCount?.followerCount || 0,
        followingCount: followCount?.followingCount || 0,
        communityCount: communityList?.totalCount || 0,
        feedCount: feedList?.totalCount || 0,
      });

      const newCommunityList = communityList?.results.map((community) => {
        console.log(community.signTime, community.signModifyTime);
        return {
          ...community,
          signInTime:
            community.signModifyTime === null
              ? createdTimeString(community.signTime!)
              : createdTimeString(community.signModifyTime!),
        };
      });
      setUserCommunityList({
        results: newCommunityList || [],
        totalCount: communityList?.totalCount || 0,
      });

      const newFeedList = feedList?.results.map((feed) => {
        return {
          ...feed,
          strCreatedTime: getTimeString(feed.createdTime),
        };
      });
      setUserFeedList({
        results: newFeedList || [],
        totalCount: feedList?.totalCount || 0,
      });
    }
  }
}

function createdTimeString(createdTime: number) {
  return moment(createdTime).format('YYYY.MM.DD');
}

export async function requestMyFollow() {
  const followers = await findAllFollow();
  if (followers !== undefined) {
    setMyFollowList(followers);
  }
}
