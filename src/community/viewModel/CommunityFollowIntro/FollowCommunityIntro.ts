import FollowCommunityItem from "./FollowCommunityItem";
import FollowPostItem from './FollowPostItem';

export default interface FollowCommunityIntro {
  communities: FollowCommunityItem[];
  communitiesTotalCount: number;
  communitiesOffset: number;
  posts: FollowPostItem[];
  postsTotalCount: number;
  postsOffset:number;
}