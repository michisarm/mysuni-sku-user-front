import { getPostItemMapFromCommunity } from "./getPostItemMapFromCommunity";

export async function getCommunityPostCreate(
    postId?: string
): Promise<void> {
    getPostItemMapFromCommunity(postId);
}