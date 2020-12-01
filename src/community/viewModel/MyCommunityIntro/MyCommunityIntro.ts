import CommunityItem from './CommunityItem';
import PostItem from './PostItem';

export default interface MyCommunityIntro {
  communities: CommunityItem[];
  communitiesTotalCount: number;
  communitiesSort: string;
  communitiesOffset: number;
  posts: PostItem[];
  postsTotalCount: number;
  postsSort: string;
  postsOffset: number;
}

export function getEmptyMyCommunityIntro(): MyCommunityIntro {
  return {
    communities: [],
    communitiesTotalCount: 0,
    communitiesSort: 'memberCreatedTime',
    communitiesOffset: 0,
    posts: [],
    postsTotalCount: 0,
    postsSort: 'createdTime',
    postsOffset: 0,
  };
}
