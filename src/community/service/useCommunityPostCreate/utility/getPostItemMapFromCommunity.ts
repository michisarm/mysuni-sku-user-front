import { findCommunityPost } from "community/api/communityApi";
import Post from "community/model/Post";
import { setCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { CommunityPostCreateItem } from "community/viewModel/CommunityPostCreate";

export async function getPostItemMapFromCommunity(
    communityId: string, 
    postId?: string
): Promise<void> {
    const postCreateItem: CommunityPostCreateItem = {
        pinned: false,
        title: '',
        contents: '',
        visible: true,
    }
    if (postId !== undefined) {
        const post:Post = await findCommunityPost(communityId, postId);
        if (post !== undefined && post !== null) {
            postCreateItem.postId = post.postId;
            postCreateItem.pinned = post.pinned;
            postCreateItem.title = post.title;
            postCreateItem.contents = post.html;
            postCreateItem.visible = post.visible;
            postCreateItem.fileBoxId = post.fileBoxId;
        }
    }
    setCommunityPostCreateItem(postCreateItem);
}