import { findCommunityMyProfile } from "community/api/profileApi";
import Profile from "community/model/Profile";
import { setCommunityMyCommunityItem } from "community/store/CommunityProfileMyCommunityStore";
import { setCommunityProfileItem } from "community/store/CommunityProfileStore";
import { CommunityProfileMyCommunity } from "community/viewModel/CommunityProfile";
 
export async function getMyCommunityItemMapFromCommunity(): Promise<void> {
    /*const profileItem: CommunityProfileItem = {
        name: '',
        company: {id:'',name:''},
        profileImg: '',
        profileBgImg: '',
        nickname: '',
        introduce: '',
        hobby: '',
    }

    const myProfile:Profile = await findCommunityMyProfile();
    if (myProfile && myProfile !== undefined && myProfile !== null) {
        profileItem.name = myProfile.name;
        profileItem.company = myProfile.company;
        profileItem.profileImg = myProfile.profileImg;
        profileItem.profileBgImg = myProfile.profileBgImg;
        profileItem.nickname = myProfile.nickname;
        profileItem.introduce = myProfile.introduce;
        profileItem.hobby = myProfile.hobby;
    }*/

    const myCommunityItem:CommunityProfileMyCommunity = {
        totalCount: 10, 
        result: [{
            type: '',
            field: '',
            name: 'name',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name2',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name3',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name4',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name5',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name6',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name7',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name8',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name9',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },{
            type: '',
            field: '',
            name: 'name10',
            // 왕관
            creatorName: '',
            memberCount: 0,
            createdTime: 0,
        },], 
    };
    setCommunityMyCommunityItem(myCommunityItem);
}