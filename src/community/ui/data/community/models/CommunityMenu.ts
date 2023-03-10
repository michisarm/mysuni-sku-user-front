import { CommunityAccessType } from './CommunityAccessType';
import { CommunityMenuType } from './CommunityMenuType';

export interface CommunityMenu {
  id: string;
  communityId: string;
  menuId: string;
  type: CommunityMenuType;
  name: string;
  url?: string;
  html?: string;
  discussionTopic?: string;
  surveyId?: string;
  surveyCaseId?: string;
  surveyInformation?: string;
  order: number;
  accessType: CommunityAccessType;
  groupId?: string;
  parentId?: string;
  lastPostTime: number;
  displayType?: MenuDisplayType;
}

export enum MenuDisplayType {
  LIST = 'LIST',
  IMAGE = 'IMAGE',
}
