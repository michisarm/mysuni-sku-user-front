import { findCommunityProfile } from '../../api/ProfileAPI'
import {
  setProfileInfoModel,
  getProfileInfoModel,
} from '../../store/ProfileInfoStore';
import { profile } from 'console';
import ProfileInfoModel from '../../model/ProfileInfoModel';
import { BadgesModel } from '../../model/BadgeModel';
import { findBadgesByBadgeIssueState, findAllOtherCommunities, findAllPostViewsFromProfileFeed, findProfilePhoto } from '../../api/ProfileInfoAPI';
import { findUserProfile } from 'profile/present/apiclient/SkProfileApi';

export async function getProfileInfo(memberId: string | undefined): Promise<void> {
  const profileItem: ProfileInfoModel = {
    name: '',
    company: { id: '', name: '' },
    profileImg: '',
    profileBgImg: '',
    nickname: '',
    oriNickname: '',
    introduce: '',
    hobby: '',
    followerCount: 0,
    followingCount: 0,
    feedCount: 0,
    badgeCount: 0,
    communityCount: 0,
    isFollow: false,
    isNickname: false,

  }
  if (memberId !== undefined) {
    const profileInfo: ProfileInfoModel | undefined = await findUserProfile(memberId);
    if (profileInfo && profileInfo !== undefined && profileInfo !== null) {
      let photoImageFilePath = profileInfo.profileImg;
      if(!profileInfo.profileImg){
        const profilePhotos = await findProfilePhoto([memberId])
        if(profilePhotos && profilePhotos[0]){
          // photoImageFilePath = "profile/photo" + profilePhotos[0].member?.photoFilename;
          photoImageFilePath = profilePhotos[0].photoImage
        }

        console.log("profilePhotos", profilePhotos)

      }
      
      profileItem.name = profileInfo.name;
      profileItem.company = profileInfo.company;
      profileItem.profileImg = photoImageFilePath;
      profileItem.profileBgImg = profileInfo.profileBgImg;
      profileItem.nickname = profileInfo.nickname;
      profileItem.oriNickname = profileInfo.nickname;
      profileItem.introduce = profileInfo.introduce;
      profileItem.hobby = profileInfo.hobby;
      profileItem.followerCount = profileInfo.followerCount;
      profileItem.followingCount = profileInfo.followingCount;
      profileItem.feedCount = profileInfo.feedCount;
      profileItem.badgeCount = profileInfo.badgeCount;
      profileItem.communityCount = profileInfo.communityCount;
      profileItem.isFollow = profileInfo.isFollow;
      profileItem.isNickname = profileInfo.isNickname;
    }
    setProfileInfoModel(profileItem);
  }
}

export async function getProfileCount(memberId: string | undefined, startDate: string, endDate: string) {
  const memberIdValue = memberId === undefined ? '' : memberId;

  const badgeData = await findBadgesByBadgeIssueState(memberIdValue, startDate, endDate);
  const communityView = await findAllOtherCommunities(memberIdValue, 'createdTime', 0);
  const postView = await findAllPostViewsFromProfileFeed(memberIdValue, 0)

  const result = { badgeCount: badgeData?.totalCount, communityCount: communityView?.totalCount, postCount: postView?.totalCount };

  return result;

}