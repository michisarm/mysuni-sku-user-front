import moment from 'moment';
import {
  followPostList, followList, followModalAdd, followModalDelete,followersModal
} from '../../../api/communityApi';
import Community from '../../../model/CommunityFollow';
import Post from '../../../model/Post';
import {
  setFollowCommunityIntro,
  getFollowCommunityIntro,
  onFollowCommunityIntro,
} from '../../../store/CommunityMainStore';

// import {
//   getFollowModal,
//   setFollowModal,
// } from '../../../store/CommunityFollowModalStore';

import FollowCommunityItem from '../../../viewModel/CommunityFollowIntro/FollowCommunityItem';
import PostItem from '../../../viewModel/CommunityFollowIntro/FollowPostItem';
import FollowModalItem from '../../../viewModel/FollowModalIntro/CommunityFollowModalIntro';
// import {requestFollowingModal, requestFollowModal} from 'community/service/useFollowModal/utility/requestFollowModalIntro';

const ONE_DAY = 24 * 60 * 60 * 1000
const ONE_HOUR = 60 * 60 * 1000
const TWO_DAY = ONE_DAY * 2


function getTimeString(createdTime: number): string {
  const timeStamp = Date.now() - createdTime;
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
  return moment(createdTime).format('YYYY.MM.DD')
}

export function requestFollowCommunityList(offset: number = 0, limit: number = 2, nickName: string = "") {
  followList(offset, limit, nickName).then(communities => {
    const followCommunityIntro = getFollowCommunityIntro() || {
      communities: [],
      posts: [],
      communitiesTotalCount: 0,
      communitiesOffset: 0,
      postsTotalCount: 0,
      postsOffset:0
    };

    if (communities === undefined) {
      setFollowCommunityIntro({
        ...followCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
        communitiesOffset:0,
      });
    } else {
      const next: FollowCommunityItem[] = [...followCommunityIntro.communities];
      communities.results.map(followPostList => {
        next.push(followPostList);
      });
      setFollowCommunityIntro({
        ...followCommunityIntro,
        communities: next,
        communitiesTotalCount: communities.totalCount,
        communitiesOffset: next.length,   
      });
    }
  });
}

// list 검색부분 별도
export function requestFollowSearchList(offset: number = 0, limit: number = 2, nickName: string = "") {
  followList(offset, limit, nickName).then(communities => {
    const followCommunityIntro = getFollowCommunityIntro() || {
      communities: [],
      posts: [],
      communitiesTotalCount: 0,
      communitiesOffset: 0,
      postsTotalCount: 0,
      postsOffset:0
    };

    if (communities === undefined) {
      setFollowCommunityIntro({
        ...followCommunityIntro,
        communities: [],
        communitiesTotalCount: 0,
        communitiesOffset:0,
      });
    } else {
      const next: FollowCommunityItem[] = [];
      communities.results.map(followPostList => {
        next.push(followPostList);
      });
      setFollowCommunityIntro({
        ...followCommunityIntro,
        communities: next,
        communitiesTotalCount: communities.totalCount,
        communitiesOffset: next.length,   
      });
    }
  });
}

function postToItem(post: Post): PostItem  {
  const { postId, communityId, menuId, title, html, createdTime, communityName, creatorName, nickName, profileImg, bookmarked,} = post;
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
    bookmarked,
  };
}

export function requestFollowCommunityPostList(offset: number = 0, limit: number = 5) {
  followPostList(offset, limit).then(posts => {
    const followCommunityIntro = getFollowCommunityIntro() || {
      communities: [],
      posts: [],
      communitiesTotalCount: 0,
      communitiesOffset: 0,
      postsTotalCount: 0,
      postsOffset:0
    };
    if (posts === undefined) {
      setFollowCommunityIntro({
        ...followCommunityIntro,
        posts: [],
        postsTotalCount: 0,
        postsOffset:0
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
        postsOffset:nextList.length,
      });

    }
  });
}

