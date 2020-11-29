import { findPostMenuName, findPostView } from "community/api/communityApi";
import Post from "community/model/Post";
import { setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { setCommunityPostMenuName } from "community/store/CommunityPostListStore";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { deletePost } from "./deleteCommunityPost";

export async function getPostMenuNameFromCommunity(
    communityId: string,
    menuId: string
): Promise<void> {
    const menuName: any = await findPostMenuName(communityId, menuId);

    return menuName.name
}