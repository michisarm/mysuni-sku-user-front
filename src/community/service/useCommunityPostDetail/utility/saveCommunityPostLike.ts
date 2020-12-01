import { registerLike } from "community/api/likeApi";

export async function saveCommunityPostLike(
  postId: string,
  memberId: string
): Promise<any> {
  const likeState = await registerLike(postId, memberId);
  return likeState;
}