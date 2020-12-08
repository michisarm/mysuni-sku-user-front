import CommunityMenuType from "../../model/CommunityMenuType";
import PostType from "../../model/PostType";

export default interface PostItem {
  communityId: string;
  menuId: string;
  postId: string;
  type: PostType;
  nickName?: string;
  communityName: string;
  profileImage: string;
  profileId: string;
  createdTime: string;
  name: string;
  contents: string;
  menuType: CommunityMenuType;
  bookmarked: boolean;
}
