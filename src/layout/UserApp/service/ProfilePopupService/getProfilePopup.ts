import ProfilePopupModel from '../../model/ProfilePopupModel';
import { findCommunityMyProfile } from '../../api/ProfileAPI'
import {
    setProfilePopupModel,
    getProfilePopupModel,
} from '../../store/ProfilePopupStore';

export async function getProfilePopup(): Promise<void> {
    const profileItem: ProfilePopupModel = {
        name: '',
        company: { id: '', name: '' },
        profileImg: '',
        profileBgImg: '',
        nickname: '',
        oriNickname: '',
        nameFlag: 'R',
        introduce: '',
        hobby: '',
        followerCount: 0,
        followingCount: 0,
    }

    const myProfile: ProfilePopupModel = await findCommunityMyProfile();
    if (myProfile && myProfile !== undefined && myProfile !== null) {
        profileItem.name = myProfile.name;
        profileItem.company = myProfile.company;
        profileItem.profileImg = myProfile.profileImg;
        profileItem.profileBgImg = myProfile.profileBgImg;
        profileItem.nickname = myProfile.nickname;
        profileItem.oriNickname = myProfile.nickname;
        profileItem.nameFlag = myProfile.nameFlag;
        profileItem.introduce = myProfile.introduce;
        profileItem.hobby = myProfile.hobby;
        profileItem.followerCount = myProfile.followerCount;
        profileItem.followingCount = myProfile.followingCount;
    }
    setProfilePopupModel(profileItem);
}
