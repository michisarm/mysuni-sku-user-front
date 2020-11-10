import { modifyCommunityPost, registerCommunityCommentPost, registerCommunityPost } from "community/api/communityApi";
import { getCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import PostCdo from "../../../model/PostCdo"
import PostUdo from "../../../model/PostUdo"

export async function saveCommunityPost(
    communityId: string,
    menuId?: string,
    postId?: string
): Promise<void> { 
    const postCreateItem = getCommunityPostCreateItem();
    if (postCreateItem !== undefined) {
        if (postId === undefined && menuId !== undefined) {
            const commentFeedbackId = await registerCommunityCommentPost(postCreateItem.title)
            const postCdo:PostCdo = {
                title: postCreateItem.title,
                html: postCreateItem.contents,
                fileBoxId: postCreateItem.fileBoxId,
                pinned: postCreateItem.pinned,
                visible: postCreateItem.visible,
                menuId,
                commentFeedbackId
            };

            registerCommunityPost(communityId, postCdo);
        } else if (postId !== undefined) {

            const postUdo:PostUdo = {
                title: postCreateItem.title,
                html: postCreateItem.contents,
                fileBoxId: postCreateItem.fileBoxId,
                pinned: postCreateItem.pinned,
                visible: postCreateItem.visible,
            };
            modifyCommunityPost(communityId, postId, postUdo); 
        }
    }
}