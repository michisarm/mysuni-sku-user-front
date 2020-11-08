import { modifyCommunityPost, registerCommunityPost } from "community/api/communityApi";
import { modifyCommunityProfile } from "community/api/profileApi";
import ProfileUdo from "community/model/ProfileUdo";
import { getCommunityProfileItem } from "community/store/CommunityProfileStore";
import { getProfileItemMapFromCommunity } from "./getProfileItemMapFromCommunity";

export async function saveCommunityProfile(): Promise<void> { 
    const profileItem = getCommunityProfileItem();
    if (profileItem !== undefined) {
        const profileUdo:ProfileUdo = {
            profileImg: profileItem.profileImg,
            profileBgImg: profileItem.profileBgImg,
            nickname:profileItem.nickname,
            introduce:profileItem.introduce,
            hobby:profileItem.hobby,
        };
        await modifyCommunityProfile(profileUdo); 
        await getProfileItemMapFromCommunity();
    }
}