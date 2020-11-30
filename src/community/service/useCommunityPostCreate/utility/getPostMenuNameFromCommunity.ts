import { findPostMenuName, findPostView } from "community/api/communityApi";
import Post from "community/model/Post";

export async function getPostMenuNameFromCommunity(
    communityId: string,
    menuId: string
): Promise<void> {
    const menuName: any = await findPostMenuName(communityId, menuId);

    return menuName.name
}