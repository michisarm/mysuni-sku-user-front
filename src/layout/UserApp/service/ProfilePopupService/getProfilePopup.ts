import ProfilePopupModel from '../../model/ProfilePopupModel';
import { findCommunityMyProfile } from '../../api/ProfileAPI';
import { setProfilePopupModel } from '../../store/ProfilePopupStore';
import SkProfileApi from 'profile/present/apiclient/SkProfileApi';
import { findFollowerWithFollowingCount } from 'community/api/communityApi';

export async function getProfilePopup(): Promise<void> {
  const profileItem: ProfilePopupModel = {
    id: '',
    name: { ko: '', en: '', zh: '' },
    company: { ko: '', en: '', zh: '' },
    profileImg: '',
    profileBgImg: '',
    nickname: '',
    displayNicknameFirst: false,
    selfIntroduce: '',
    followerCount: 0,
    followingCount: 0,
  };

  const myProfile = await SkProfileApi.instance.findSkProfile();
  if (myProfile && myProfile !== undefined && myProfile !== null) {
    const {
      id,
      name,
      companyName,
      photoFilePath,
      backgroundImagePath,
      nickname,
      displayNicknameFirst,
      selfIntroduction,
    } = myProfile.user;

    const followCount = await findFollowerWithFollowingCount(id);
    profileItem.id = id;
    profileItem.name = name;
    profileItem.company = companyName;
    profileItem.profileImg = photoFilePath;
    profileItem.profileBgImg = backgroundImagePath;
    profileItem.nickname = nickname;
    profileItem.displayNicknameFirst = displayNicknameFirst;
    profileItem.selfIntroduce = selfIntroduction;
    profileItem.followerCount = (followCount && followCount.followerCount) || 0;
    profileItem.followingCount =
      (followCount && followCount.followingCount) || 0;
  }
  setProfilePopupModel(profileItem);
}
