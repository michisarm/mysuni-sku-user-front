import { getPostMenuNameFromCommunity } from "./getPostMenuNameFromCommunity";

export async function getCommunityPostName(
    communityId: string,
    menuId: string
) { 
    return getPostMenuNameFromCommunity(communityId, menuId); 
}