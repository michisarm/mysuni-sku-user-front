import { patronInfo } from "@nara.platform/dock";
import moment from "moment";
import { findAllMyCommunities, findAllPostViewsFromProfileFeed } from "../../../api/communityApi";
import { getCommunityProfileMyCommunity, setCommunityProfileMyCommunity } from "../../../store/CommunityProfileMyCommunityStore";
import { getEmtpyCommunityProfileMyCommunity, getEmtpyCommunityProfileFeed } from "../../../viewModel/CommunityProfile";
import CommunityView from '../../../model/CommunityView'
import ProfileCommunityItem from "../../../viewModel/CommunityProfile/ProfileCommunityItem";
import { getCommunityProfileFeed, setCommunityProfileFeed } from "community/store/CommunityProfileFeedStore";
import {
  findAllMyOpenCommunities,
  findAllPostViewsFromMyCommunities,
} from '../../../api/communityApi';
import Post from "community/model/Post";
import PostItem from "community/viewModel/CommunityProfileFeed/PostItem";
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

export async function requestProfileFeeds() {
  // const { postsSort } = getCommunityProfileFeed() || getEmtpyCommunityProfileFeed();

  // findAllPostViewsFromMyCommunities('', 0).then(posts => {
  findAllPostViewsFromProfileFeed(0).then(posts => {
    const myCommunityIntro =
      getCommunityProfileFeed() || getEmtpyCommunityProfileFeed();
    if (posts === undefined) {
      setCommunityProfileFeed({
        ...myCommunityIntro,
        posts: [],
        postsTotalCount: 0,
        postsOffset: 0,
      });
    } else {
      setCommunityProfileFeed({
        ...myCommunityIntro,
        posts: posts.results.map(postToItem),
        postsTotalCount: posts.totalCount,
        postsOffset: posts.results.length,
      });
    }
  });
}

export function requestAppendProfileFeedPostList() {
  const {  postsOffset } =
  getCommunityProfileFeed() || getEmtpyCommunityProfileFeed();

  // findAllPostViewsFromMyCommunities('', postsOffset).then(posts => {
  findAllPostViewsFromProfileFeed(postsOffset).then(posts => {
    const communityProfileFeed =
      getCommunityProfileFeed() || getEmtpyCommunityProfileFeed();
    if (posts === undefined) {
      setCommunityProfileFeed({
        ...communityProfileFeed,
        posts: [],
        postsTotalCount: 0,
        postsOffset: 0,
      });
    } else {
      const next = [
        ...communityProfileFeed.posts,
        ...posts.results.map(postToItem),
      ];
      setCommunityProfileFeed({
        ...communityProfileFeed,
        posts: next,
        postsTotalCount: posts.totalCount,
        postsOffset: next.length,
      });
    }
  });
}

