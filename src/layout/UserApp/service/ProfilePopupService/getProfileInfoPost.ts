import { patronInfo } from '@nara.platform/dock';
import moment from "moment";
import { findAllPostViewsFromProfileFeed } from '../../api/ProfileInfoAPI';
import {
  setProfileInfoPostModel,
  getProfileInfoPostModel
} from '../../store/ProfileInfoPostStore';
import { getEmtpyCommunityProfileFeed, PostItem, PostModel } from '../../model/PostModel';

export async function getProfileInfoPost(memberId: string | undefined) {
  const memberIdValue = memberId === undefined ? '' : memberId;
  const offset = 0;
  findAllPostViewsFromProfileFeed(memberIdValue, offset).then(posts => {
    const postView =
      getProfileInfoPostModel() || getEmtpyCommunityProfileFeed();
    if (posts === undefined) {
      setProfileInfoPostModel({
        ...postView,
        posts: [],
        postsTotalCount: 0,
        postsOffset: 0,
      });
    } else {
      setProfileInfoPostModel({
        ...postView,
        posts: posts.results.map(postToItem),
        postsTotalCount: posts.totalCount,
        postsOffset: posts.results.length,
      });
    }
  });
}


function postToItem(post: PostModel): PostItem {
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
