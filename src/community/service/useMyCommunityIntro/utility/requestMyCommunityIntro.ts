import moment from 'moment';
import {
  findAllMyOpenCommunities,
  findAllPostViewsFromMyCommunities,
} from '../../../api/communityApi';
import CommunityView from '../../../model/CommunityView';
import Post from '../../../model/Post';
import {
  getMyCommunityIntro,
  setMyCommunityIntro,
} from '../../../store/CommunityMainStore';
import CommunityItem from '../../../viewModel/MyCommunityIntro/CommunityItem';
import { getEmptyMyCommunityIntro } from '../../../viewModel/MyCommunityIntro/MyCommunityIntro';
import PostItem from '../../../viewModel/MyCommunityIntro/PostItem';

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;
const TWO_DAY = ONE_DAY * 2;

function getTimeString(createTime: number): string {
  const timeStamp = Date.now() - createTime;
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
  return moment(createTime).format('YYYY.MM.DD');
}

function communityToItem(community: CommunityView): CommunityItem {
  const {
    communityId,
    thumbnailId,
    name,
    managerName,
    memberCount,
    lastPostTime,
  } = community;
  return {
    communityId,
    thumbnailId,
    name,
    hasNewPost:
      Date.now() - ONE_DAY < (lastPostTime === null ? 0 : lastPostTime),
    managerName: managerName || '',
    memberCount,
  };
}

export function requestMyCommunityList() {
  const { communitiesSort } =
    getMyCommunityIntro() || getEmptyMyCommunityIntro();
  findAllMyOpenCommunities(communitiesSort, 0).then(communities => {
    const myCommunityIntro =
      getMyCommunityIntro() || getEmptyMyCommunityIntro();
    if (communities === undefined) {
      setMyCommunityIntro({
        ...myCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
        communitiesOffset: 0,
      });
    } else {
      const next: CommunityItem[] = [];
      communities.results.forEach(community => {
        console.log('comm', community);
        if (!next.some(c => c.communityId === community.communityId)) {
          next.push(communityToItem(community));
        }
      });
      setMyCommunityIntro({
        ...myCommunityIntro,
        communities: next,
        communitiesTotalCount: communities.totalCount,
        communitiesOffset: communities.results.length,
      });
    }
  });
}

export function requestAppendMyCommunityList() {
  const { communitiesSort, communitiesOffset } =
    getMyCommunityIntro() || getEmptyMyCommunityIntro();
  findAllMyOpenCommunities(communitiesSort, communitiesOffset).then(
    communities => {
      const myCommunityIntro =
        getMyCommunityIntro() || getEmptyMyCommunityIntro();
      if (communities !== undefined) {
        const next: CommunityItem[] = [...myCommunityIntro.communities];
        communities.results.forEach(community => {
          if (!next.some(c => c.communityId === community.communityId)) {
            next.push(communityToItem(community));
          }
        });
        setMyCommunityIntro({
          ...myCommunityIntro,
          communities: next,
          communitiesTotalCount: communities.totalCount,
          communitiesOffset: next.length,
        });
      }
    }
  );
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
  } = post;
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

export function requestMyCommunityPostList() {
  const { postsSort } = getMyCommunityIntro() || getEmptyMyCommunityIntro();

  findAllPostViewsFromMyCommunities(postsSort, 0).then(posts => {
    const myCommunityIntro =
      getMyCommunityIntro() || getEmptyMyCommunityIntro();
    if (posts === undefined) {
      setMyCommunityIntro({
        ...myCommunityIntro,
        posts: [],
        postsTotalCount: 0,
        postsOffset: 0,
      });
    } else {
      setMyCommunityIntro({
        ...myCommunityIntro,
        posts: posts.results.map(postToItem),
        postsTotalCount: posts.totalCount,
        postsOffset: posts.results.length,
      });
    }
  });
}

export function requestAppendMyCommunityPostList() {
  const { postsSort, postsOffset } =
    getMyCommunityIntro() || getEmptyMyCommunityIntro();

  findAllPostViewsFromMyCommunities(postsSort, postsOffset).then(posts => {
    const myCommunityIntro =
      getMyCommunityIntro() || getEmptyMyCommunityIntro();
    if (posts === undefined) {
      setMyCommunityIntro({
        ...myCommunityIntro,
        posts: [],
        postsTotalCount: 0,
        postsOffset: 0,
      });
    } else {
      const next = [
        ...myCommunityIntro.posts,
        ...posts.results.map(postToItem),
      ];
      setMyCommunityIntro({
        ...myCommunityIntro,
        posts: next,
        postsTotalCount: posts.totalCount,
        postsOffset: next.length,
      });
    }
  });
}
