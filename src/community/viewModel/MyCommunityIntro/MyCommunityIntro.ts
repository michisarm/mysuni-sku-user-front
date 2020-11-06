import CommunityItem from "./CommunityItem";
import PostItem from "./PostItem";

export default interface MyCommunityIntro {
  communities: CommunityItem[];
  posts: PostItem[];
}