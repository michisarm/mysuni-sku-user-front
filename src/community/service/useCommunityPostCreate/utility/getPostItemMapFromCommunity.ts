import Post from "community/model/Post";
import { setCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { CommunityPostCreateItem } from "community/viewModel/CommunityPostCreate";
import { findPostView } from "../../../api/communityApi";

export async function getPostItemMapFromCommunity(
    postId?: string
): Promise<void> {
    const postCreateItem: CommunityPostCreateItem = {
        pinned: false,
        title: '',
        contents: '',
        visible: true,
        menuType:'',
    }
    if (postId !== undefined) {
        const post: Post = await findPostView(postId);
        if (post !== undefined && post !== null) {
            postCreateItem.postId = post.postId;
            postCreateItem.pinned = post.pinned;
            postCreateItem.title = post.title;
            postCreateItem.contents = post.html;
            postCreateItem.visible = post.visible;
            postCreateItem.fileBoxId = post.fileBoxId;
            postCreateItem.menuType = post.menuType;
        }
    }
    setCommunityPostCreateItem(postCreateItem);
}