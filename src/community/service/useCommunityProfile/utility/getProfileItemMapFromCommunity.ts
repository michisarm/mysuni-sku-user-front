import { findCommunityMyProfile } from "community/api/profileApi";
import Profile from "community/model/Profile";
import { setCommunityProfile } from "community/store/CommunityProfileStore";
import CommunityProfileItem from "community/viewModel/CommunityProfile";

export async function getProfileItemMapFromCommunity(): Promise<void> {
    const profileItem: CommunityProfileItem = {
        name: '송중기',
        company: {id:'',name:'우리회사'},
        photo: '',
        nickname: '중기',
        introduce: '안녕하세요',
        hobby: '드라마감상',
    }

    const myProfile:Profile = await findCommunityMyProfile();
    if (myProfile && myProfile !== undefined && myProfile !== null) {
        profileItem.name = myProfile.name;
        profileItem.company = myProfile.company;
        profileItem.photo = myProfile.photo;
        profileItem.nickname = myProfile.nickname;
        profileItem.introduce = myProfile.introduce;
        profileItem.hobby = myProfile.hobby;
    }
    setCommunityProfile(profileItem);
}