interface Urls {
  title: string;
  url: string;
}

export interface CommunityDiscussion {
  content: string;
  privateComment: boolean;
  relatedUrlList: Urls[];
  fileBoxId: string;
  accessType?: string;
  groupId?: string;
}

export function getEmptyCommunityDiscussion() {
  return {
    content: '',
    privateComment: false,
    relatedUrlList: [{ title: '', url: '' }],
    fileBoxId: '',
  };
}
