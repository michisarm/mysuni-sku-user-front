import { getPostDetailMapFromCommunity, getPostDetailWithReadMapFromCommunity } from "./getPostDetailMapFromCommunity";

export async function getCommunityPostDetail(
    communityId: string,
    postId?: string
): Promise<void> { 
    getPostDetailMapFromCommunity(communityId, postId); 
}

export async function getCommunityPostDetailWithIncreaseReadCount(
    communityId: string,
    postId: string
): Promise<void> { 
    getPostDetailWithReadMapFromCommunity(communityId, postId);
}