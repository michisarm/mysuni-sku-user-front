import CommunityMenuType from "../../model/CommunityMenuType";

export default interface PostItem {
  communityId: string;
  menuId: string;
  postId: string;
  communityName: string;
  profileImage: string;
  profileId: string;
  createdTime: string;
  name: string;
  contents: string;
  menuType: CommunityMenuType;
  bookmarked: boolean;
  
  creatorId: string;
  introduce:string;
  nickName:string;
}
