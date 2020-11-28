
import { modifyCommunityProfile } from "community/api/profileApi";
import ProfileUdo from "community/model/ProfileUdo";
import { getCommunityProfileItem } from "community/store/CommunityProfileStore";
import { NameValueList } from "shared/model";
import { getProfileItemMapFromCommunity } from "./getProfileItemMapFromCommunity";

export async function saveCommunityProfile(): Promise<void> {
    const profileItem = getCommunityProfileItem();
    if (profileItem !== undefined) {
        const profileNameValues: NameValueList = {
            nameValues: [
              {
                name: 'profileImg',
                value: profileItem.profileImg,
              },
              {
                name: 'profileBgImg',
                value: profileItem.profileBgImg,
              },
              {
                name: 'nickname',
                value: profileItem.nickname,
              },
              {
                name: 'introduce',
                value: profileItem.introduce,
              },
              {
                name:'hobby',
                value: profileItem.hobby,
              }
            ]
        };
        await modifyCommunityProfile(profileNameValues).then(() => {
            getProfileItemMapFromCommunity();
        });
    }
}