import CommunityItem from "./CommunityItem";
import PostItem from "./PostItem";

export default interface MyCommunity {
  communities: CommunityItem[];
  posts: PostItem[];
}