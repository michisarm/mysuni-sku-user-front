import { getPostListMapFromCommunity } from "./getPostListMapFromCommunity";

export async function getCommunityPostList(
  communityId: string,
  offset: number,
  limit: number,
  sortType: string,
  searchType: string,
  searchText: string
): Promise<void> {
  await getPostListMapFromCommunity(communityId, offset, limit, sortType, searchType, searchText);
}
