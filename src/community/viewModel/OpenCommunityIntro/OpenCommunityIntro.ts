import FieldItem from './FieldItem';
import OpenCommunityItem from './OpenCommunityItem';

export default interface OpenCommunityIntro {
  fields: FieldItem[];
  communities: OpenCommunityItem[];
  communitiesSort: string;
  communitiesTotalCount: number;
  communitiesOffset: number;
  fieldId?: string;
}

export function getEmptyOpenCommunityIntro(): OpenCommunityIntro {
  return {
    fields: [],
    communities: [],
    communitiesSort: 'createdTime',
    communitiesTotalCount: 0,
    communitiesOffset: 0,
  };
}
