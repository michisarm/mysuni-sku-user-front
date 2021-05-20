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
  content: string;
  relatedUrlList?: UrlList[];
  fileBoxId?: string;
  privateComment?: boolean;
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
  results: GroupListItem[];
}

export interface UrlList {
  title: string;
  url: string;
}
