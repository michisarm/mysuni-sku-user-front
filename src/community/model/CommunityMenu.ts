import CommunityAccessType from './CommunityAccessType';
import CommunityMenuType from './CommunityMenuType';

export default interface CommunityMenu {
  id: string;
  communityId: string;
  menuId: string;
  type: CommunityMenuType;
  name: string;
  url: string;
  html: string;
  discussionTopic: string;
  surveyId: string;
  surveyInformation: string;
  order: number;
  accessType: CommunityAccessType;
  groupId: string;
  parentId: string;
}
