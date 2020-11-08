import CommunityItem from "./CommunityItem";
import PostItem from "./PostItem";

export default interface MyCommunityIntro {
  communities: CommunityItem[];
  communitiesTotalCount: number;
  posts: PostItem[];
  postsTotalCount:number;
}