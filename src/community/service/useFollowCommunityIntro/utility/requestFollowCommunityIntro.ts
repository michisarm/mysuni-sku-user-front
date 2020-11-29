import moment from 'moment';
import {
  followPostList, followList
} from '../../../api/communityApi';
import Community from '../../../model/CommunityFollow';
import Post from '../../../model/Post';
import {
  setFollowCommunityIntro,
  getFollowCommunityIntro,
  onFollowCommunityIntro,
} from '../../../store/CommunityMainStore';
import FollowCommunityItem from '../../../viewModel/CommunityFollowIntro/FollowCommunityItem';
import PostItem from '../../../viewModel/CommunityFollowIntro/FollowPostItem';

const ONE_DAY = 24 * 60 * 60 * 1000
const ONE_HOUR = 60 * 60 * 1000
const TWO_DAY = ONE_DAY * 2


function getTimeString(createTime: number): string {
  const timeStamp = Date.now() - createTime;
  if (timeStamp < 0) {
    return '';
  }
  if (timeStamp < ONE_HOUR) {
    return `${Math.floor(timeStamp / 1000 / 60)}분 전`
  }
  if (timeStamp < ONE_DAY) {
    return `${Math.floor(timeStamp / 1000 / 60 / 60)}시간 전`
  }
  if (timeStamp < TWO_DAY) {
    return '1일 전'
  }
  return moment(createTime).format('YYYY.MM.DD')
}


export function requestFollowCommunityList(offset: number = 0, limit: number = 10, nickName: string = "") {
  followList(offset, limit, nickName).then(communities => {
    const followCommunityIntro = getFollowCommunityIntro() || {
      communities: [],
      posts: [],
      communitiesTotalCount: 0,
      postsTotalCount: 0,
    };

    if (communities === undefined) {
      setFollowCommunityIntro({
        ...followCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
      });
    } else {
      const next: FollowCommunityItem[] = [];
      communities.results.forEach(followPostList => {
        next.push(followPostList);
      });
      setFollowCommunityIntro({
        ...followCommunityIntro,
        communities: next,
        communitiesTotalCount: communities.totalCount,
      });
    }
  });
}

function postToItem(post: Post): PostItem {
  const { postId, communityId, menuId, title, html, createdTime, communityName, creatorName, nickName, profileImg } = post;
  return {
    communityId,
    menuId,
    postId,
    communityName,
    profileImage: profileImg || '',
    profileId: nickName || creatorName || '',
    createTime: getTimeString(createdTime),
    name: title,
    contents: html,
  };
}

export function requestFollowCommunityPostList(offset: number = 0, limit: number = 5) {
  followPostList(offset, limit).then(posts => {
    const followCommunityIntro = getFollowCommunityIntro() || {
      communities: [],
      posts: [],
      communitiesTotalCount: 0,
      postsTotalCount: 0,
    };
    if (posts === undefined) {
      setFollowCommunityIntro({
        ...followCommunityIntro,
        posts: [],
        postsTotalCount: 0,
      });
    } else {
      const nextList = [
        ...followCommunityIntro.posts,
        ...posts.results.map(postToItem),
      ];
      setFollowCommunityIntro({
        ...followCommunityIntro,
        posts: nextList,
        postsTotalCount: posts.totalCount,
      });
    }
  });
}