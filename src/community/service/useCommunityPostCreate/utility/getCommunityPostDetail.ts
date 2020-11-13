import { getPostDetailMapFromCommunity } from "./getPostDetailMapFromCommunity";

export async function getCommunityPostDetail(
    communityId: string,
    postId?: string
): Promise<void> { 
    getPostDetailMapFromCommunity(communityId, postId); 
}