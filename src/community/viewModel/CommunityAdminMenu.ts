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
  url: string;
  html: string;
}

export interface CommunityAdminMenu {
  menu: MenuItem[];
}

export function getEmtpyCommunityAdminMenu(): CommunityAdminMenu {
  return {
    menu: [],
  }
}

export interface GroupList {
  results: GroupListItem[]
}
