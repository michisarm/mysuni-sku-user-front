export interface MenuItem {
  accessType: string;
  communityId: string;
  groupId: any;
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
  url: string;
  html: string;
}

export interface CommunityAdminMenu {
  menu: MenuItem[];
}

export interface GroupListItem {
  groupId: string;
  id: string;
  name: string;
  commmunityId: string;
}

export interface GroupList {
  results: GroupListItem[]
}