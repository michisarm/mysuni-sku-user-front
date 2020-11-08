import { deleteCommunityPost } from "community/api/communityApi";

export async function deletePost(communityId: string, postId: string) {
    const deleteItem = await deleteCommunityPost(communityId, postId);
    return deleteItem;
  }