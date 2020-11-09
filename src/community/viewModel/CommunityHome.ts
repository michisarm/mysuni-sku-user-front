import Community from '../model/Community';
import CommunityHomeInfo from '../model/CommunityHome';
import CommunityMenu from '../model/CommunityMenu';
import Post from '../model/Post';

export default interface CommunityHome {
  community?: Community;
  home?: CommunityHomeInfo;
  menus: CommunityMenu[];
  notice: Post[];
  recent: Post[];
}
