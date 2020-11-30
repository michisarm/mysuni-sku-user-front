import CommunityMenu from '../model/CommunityMenu';
import CommunityView from '../model/CommunityView';
import Post from '../model/Post';

export default interface CommunityHome {
  community?: CommunityView;
  menus: CommunityMenu[];
  notice: Post[];
  recent: Post[];
}

export function getEmptyCommunityHome(): CommunityHome {
  return {
    menus: [],
    recent: [],
    notice: [],
  };
}
