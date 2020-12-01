import FollowModalItem from './FollowModalItem';
export default interface CommunityFollowModalIntro {
  communities: FollowModalItem[];
  communitiesTotalCount: number;
  posts: FollowModalItem[];
  results: FollowModalItem[];
}