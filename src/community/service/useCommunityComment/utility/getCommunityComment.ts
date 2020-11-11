import { getCommentMapFromCommunity } from "community/service/useCommunityPostCreate/utility/getCommentMapFromCommunity";
import { getPostDetailMapFromCommunity } from "community/service/useCommunityPostCreate/utility/getPostDetailMapFromCommunity";

export async function getCommunityComment(
    commentFeedbackId: string,
): Promise<void> { 
    getCommentMapFromCommunity(commentFeedbackId); 
}