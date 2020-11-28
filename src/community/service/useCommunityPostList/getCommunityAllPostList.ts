import PostRdo from "community/model/PostRdo";
import { getAllPostListMapFromCommunity } from "./getAllPostListMapFromCommunity";

export async function getCommunityAllPostList(
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
  await getAllPostListMapFromCommunity(param);
}
