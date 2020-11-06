import { getPostItemMapFromCommunity } from "./getPostItemMapFromCommunity";

export async function getCommunityPostCreate(
    communityId: string,
    postId?: string
): Promise<void> { 
    getPostItemMapFromCommunity(communityId, postId); 
}