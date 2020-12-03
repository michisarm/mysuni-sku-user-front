import { findPostMenuName, findPostView } from "community/api/communityApi";
import Post from "community/model/Post";
import Menu from "community/model/Menu";

export async function getPostMenuNameFromCommunity(
    communityId: string,
    menuId: string
): Promise<void> {
    const menuName: any = await findPostMenuName(communityId, menuId);

    return menuName.name
}

export async function getPostMenuFromCommunity(
    communityId: string,
    menuId: string
): Promise<Menu> {
    const menu: Menu = await findPostMenuName(communityId, menuId);

    return menu
}