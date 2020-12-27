import { IdName } from '@nara.platform/accent';
import CommunityType from '../model/CommunityType';
import ProfileCommunityItem from './CommunityProfile/ProfileCommunityItem';
import PostItem from './CommunityProfileFeed/PostItem';

export interface MenuItem {
  accessType: string;
  communityId: string;
  groupId: string;
  id: string;
  munuId: string;
  name: string;
  order: number;
  parentId: string;
  patronKey: any;
  type: string;
  child: any;
  discussionTopic: string;
  surveyCaseId?: string;
  surveyId?: string;
  surveyInformation?: string;
}

export interface CommunityAdminMenu {
  menu: MenuItem[];
  // postsTotalCount: number;
  // postsOffset: number;
}

export function getEmtpyCommunityAdminMenu(): CommunityAdminMenu {
  return {
    menu: [],
  }
}
