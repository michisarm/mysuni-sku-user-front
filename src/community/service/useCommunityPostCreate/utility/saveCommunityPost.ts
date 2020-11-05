import { modifyCommunityPost, registerCommunityPost } from "community/api/communityApi";
import { getCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { getPostItemMapFromCommunity } from "./getPostItemMapFromCommunity";
import PostCdo from "../../../model/PostCdo"
import PostUdo from "../../../model/PostUdo"

export async function saveCommunityPost(
    communityId: string,
    postId?: string
): Promise<void> { 
    const postCreateItem = getCommunityPostCreateItem();
    if (postCreateItem !== undefined) {
        if (postId === undefined) {

            const postCdo:PostCdo = {
                title: postCreateItem.title,
                html: postCreateItem.contents,
                fileBoxId: '',
                pinned: false,
                visible: true,
            };

            registerCommunityPost(communityId, postCdo);
        } else {

            const postUdo:PostUdo = {
                title: postCreateItem.title,
                html: postCreateItem.contents,
                fileBoxId: '',
                pinned: false,
                visible: true,
            };
            modifyCommunityPost(communityId, postId, postUdo); 
        }
    }
}