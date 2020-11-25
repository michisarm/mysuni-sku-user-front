import moment from 'moment';
import {
  findAllMyCommunities, findAllPostViewsFromMyCommunities,
} from '../../../api/communityApi';
import Community from '../../../model/Community';
import Post from '../../../model/Post';
import {
  getMyCommunityIntro,
  setMyCommunityIntro,
} from '../../../store/CommunityMainStore';
import CommunityItem from '../../../viewModel/MyCommunityIntro/CommunityItem';
import PostItem from '../../../viewModel/MyCommunityIntro/PostItem';

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

function communityToItem(community: Community): CommunityItem {
  const {
    type,
    communityId,
    fieldName,
    thumbnailId,
    name,
    managerName,
    memberCount,
    approved,
    lastPostTime,
  } = community;
  return {
    type,
    communityId,
    fieldTitle: fieldName,
    image: thumbnailId,
    name,
    hasNewPost: Date.now() - ONE_DAY < (lastPostTime === null ? 0 : lastPostTime),
    manager: managerName,
    memberCount,
    approved,
    lastPostTime,
  };
}

export function requestMyCommunityList() {
  findAllMyCommunities('name').then(communities => {
    const myCommunityIntro = getMyCommunityIntro() || {
      communities: [],
      posts: [],
      communitiesTotalCount: 0,
      postsTotalCount: 0,
    };
    if (communities === undefined) {
      setMyCommunityIntro({
        ...myCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
      });
    } else {
      const next: CommunityItem[] = [];
      communities.results.forEach(community => {
        if (!next.some(c => c.communityId === community.communityId)) {
          next.push(communityToItem(community));
        }
      });
      setMyCommunityIntro({
        ...myCommunityIntro,
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

export function requestMyCommunityPostList(sort: string = 'createTime', offset: number = 0, limit: number = 10) {
  findAllPostViewsFromMyCommunities(sort, offset, limit).then(posts => {
    const myCommunityIntro = getMyCommunityIntro() || {
      communities: [],
      posts: [],
      communitiesTotalCount: 0,
      postsTotalCount: 0,
    };
    if (posts === undefined) {
      setMyCommunityIntro({
        ...myCommunityIntro,
        posts: [],
        postsTotalCount: 0,
      });
    } else {
      setMyCommunityIntro({
        ...myCommunityIntro,
        posts: posts.results.map(postToItem),
        postsTotalCount: posts.totalCount,
      });
    }
  });
}
