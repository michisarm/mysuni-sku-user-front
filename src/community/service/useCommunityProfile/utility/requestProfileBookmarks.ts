import { patronInfo } from "@nara.platform/dock";
import moment from "moment";
import { findAllMyCommunities, findAllPostViewsFromProfileBookmark } from "../../../api/communityApi";
import { getCommunityProfileMyCommunity, setCommunityProfileMyCommunity } from "../../../store/CommunityProfileMyCommunityStore";
import { getEmtpyCommunityProfileMyCommunity, getEmtpyCommunityProfileBookmark } from "../../../viewModel/CommunityProfile";
import CommunityView from '../../../model/CommunityView'
import ProfileCommunityItem from "../../../viewModel/CommunityProfile/ProfileCommunityItem";
import { getCommunityProfileBookmark, setCommunityProfileBookmark} from "community/store/CommunityProfileBookmarkStore";
import {
  findAllMyOpenCommunities,
  findAllPostViewsFromMyCommunities,
} from '../../../api/communityApi';
import Post from "community/model/Post";
import PostItem from "community/viewModel/CommunityProfileBookmark/PostItem";
// 

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const TWO_DAY = ONE_DAY * 2;

function getTimeString(createdTime: number): string {
  const timeStamp = Date.now() - createdTime;
  if (timeStamp < 0) {
    return '';
  }
  if (timeStamp < ONE_HOUR) {
    return `${Math.floor(timeStamp / 1000 / 60)}분 전`;
  }
  if (timeStamp < ONE_DAY) {
    return `${Math.floor(timeStamp / 1000 / 60 / 60)}시간 전`;
  }
  if (timeStamp < TWO_DAY) {
    return '1일 전';
  }
  return moment(createdTime).format('YYYY.MM.DD');
}

function postToItem(post: Post): PostItem {
  const {
    postId,
    communityId,
    menuId,
    title,
    html,
    createdTime,
    communityName,
    creatorName,
    nickName,
    profileImg,
    menuType,
    bookmarked,
  } = post;
  return {
    communityId,
    menuId,
    postId,
    communityName,
    profileImage: profileImg || '',
    profileId: nickName || creatorName || '',
    createdTime: getTimeString(createdTime),
    name: title,
    contents: html,
    menuType,
    bookmarked,
  };
}

// 

export async function requestProfileBookmarks() {
  // const { postsSort } = getCommunityProfileBookmark() || getEmtpyCommunityProfileBookmark();

  // findAllPostViewsFromMyCommunities('', 0).then(posts => {
  findAllPostViewsFromProfileBookmark(0).then(posts => {
    const myCommunityIntro =
      getCommunityProfileBookmark() || getEmtpyCommunityProfileBookmark();
    if (posts === undefined) {
      setCommunityProfileBookmark({
        ...myCommunityIntro,
        posts: [],
        postsTotalCount: 0,
        postsOffset: 0,
      });
    } else {
      setCommunityProfileBookmark({
        ...myCommunityIntro,
        posts: posts.results.map(postToItem),
        postsTotalCount: posts.totalCount,
        postsOffset: posts.results.length,
      });
    }
  });
}

export function requestAppendProfileBookmarkPostList() {
  const {  postsOffset } =
  getCommunityProfileBookmark() || getEmtpyCommunityProfileBookmark();

  // findAllPostViewsFromMyCommunities('', postsOffset).then(posts => {
  findAllPostViewsFromProfileBookmark(postsOffset).then(posts => {
    const communityProfileBookmark =
      getCommunityProfileBookmark() || getEmtpyCommunityProfileBookmark();
    if (posts === undefined) {
      setCommunityProfileBookmark({
        ...communityProfileBookmark,
        posts: [],
        postsTotalCount: 0,
        postsOffset: 0,
      });
    } else {
      const next = [
        ...communityProfileBookmark.posts,
        ...posts.results.map(postToItem),
      ];
      setCommunityProfileBookmark({
        ...communityProfileBookmark,
        posts: next,
        postsTotalCount: posts.totalCount,
        postsOffset: next.length,
      });
    }
  });
}

