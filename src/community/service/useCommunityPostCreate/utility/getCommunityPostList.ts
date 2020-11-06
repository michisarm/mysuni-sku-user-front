import PostRdo from "community/model/PostRdo";
import { getPostListMapFromCommunity } from "./getPostListMapFromCommunity";

export async function getCommunityPostList(
  // startDate: string,
  // endDate: string,
  // title: string,
  // html: string,
  // creatorId: string,
  // offset: number,
  // limit: number,
  // searchFilter: string,
  // menuId: string,
  // communityId: string,
  param: PostRdo
): Promise<void> {
  await getPostListMapFromCommunity(param);
}
