import FollowCommunityItem from "./FollowCommunityItem";
import FollowPostItem from './FollowPostItem';

export default interface FollowCommunityIntro {
  communities: FollowCommunityItem[];
  communitiesTotalCount: number;
  posts: FollowPostItem[];
  postsTotalCount: number;
}