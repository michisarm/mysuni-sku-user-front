import { findCommunityMyProfile } from "community/api/profileApi";
import Profile from "community/model/Profile";
import { setCommunityProfileItem } from "community/store/CommunityProfileStore";
import { CommunityProfileItem } from "community/viewModel/CommunityProfile";

export async function getProfileItemMapFromCommunity(): Promise<void> {
    const profileItem: CommunityProfileItem = {
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
    }

    const myProfile: Profile = await findCommunityMyProfile();
    if (myProfile && myProfile !== undefined && myProfile !== null) {
        profileItem.name = myProfile.name;
        profileItem.company = myProfile.company;
        profileItem.profileImg = myProfile.profileImg;
        profileItem.profileBgImg = myProfile.profileBgImg;
        profileItem.nickname = myProfile.nickname;
        profileItem.oriNickname = myProfile.nickname;
        profileItem.introduce = myProfile.introduce;
        profileItem.hobby = myProfile.hobby;
        profileItem.followerCount = myProfile.followerCount;
        profileItem.followingCount = myProfile.followingCount;
    }
    setCommunityProfileItem(profileItem);
}
