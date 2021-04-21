import { findMenu } from "../../../api/communityApi";

export async function getPostMenuNameFromCommunity(
    communityId: string,
    menuId: string
): Promise<string> {
    const name = (await findMenu(communityId, menuId)).name;
    return name;
}
