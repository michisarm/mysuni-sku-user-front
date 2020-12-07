import CommunityHomeInfo from 'community/model/CommunityHome';
import CommunityMenu from '../model/CommunityMenu';
import CommunityView from '../model/CommunityView';
import Post from '../model/Post';

export default interface CommunityHome {
  community?: CommunityView;
  preview?: CommunityHomeInfo;
  menus: CommunityMenu[];
  notice: Post[];
  recent: Post[];
  noticeRequested: boolean;
  recentRequested: boolean;
}

export function getEmptyCommunityHome(): CommunityHome {
  return {
    menus: [],
    recent: [],
    notice: [],
    noticeRequested: false,
    recentRequested: false,
  };
}


