import PostRdo from "community/model/PostRdo";
import { getNoticePostGroupManagerFromCommunity, getNoticePostListMapFromCommunity } from "./getNoticePostListMapFromCommunity";

export async function getCommunityNoticePostList(
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
  await getNoticePostListMapFromCommunity(param);
}

export async function getNoticePostGroupManager(
  communityId: string
): Promise<void> {
  return getNoticePostGroupManagerFromCommunity(communityId);
}
