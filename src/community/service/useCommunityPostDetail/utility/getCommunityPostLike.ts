import { findCommunityPostLikeCountByMember } from '../../../api/likeApi';

export async function getCommunityPostLikeCountByMember(
  postId: string,
  memberId: string
): Promise<any> {
  const likeCount = await findCommunityPostLikeCountByMember(postId, memberId);
  return likeCount;
}
