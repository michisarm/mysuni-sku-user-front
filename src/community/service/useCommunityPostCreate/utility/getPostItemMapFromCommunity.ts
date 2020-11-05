import { findCommunityPost } from "community/api/communityApi";
import Post from "community/model/Post";
import { setCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { CommunityPostCreateItem } from "community/viewModel/CommunityPostCreate";

export async function getPostItemMapFromCommunity(
    communityId: string, 
    postId: string
): Promise<void> {
    const post:Post = await findCommunityPost(communityId, postId);
    const postCreateItem: CommunityPostCreateItem = {
        postId: post.postId,
        title: post.title,
        contents: post.html,
    }
    setCommunityPostCreateItem(postCreateItem);
}