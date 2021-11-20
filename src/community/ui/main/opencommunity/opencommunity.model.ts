import { CommunityMemberApprovedType } from '../../data/community/models/CommunityMemberApprovedType';
import { CommunityView } from '../../data/community/models/CommunityView';
import dayjs from 'dayjs';
import { CommunityType } from '../../data/community/models/CommunityType';

type sort = 'createdTime' | 'memberCount' | 'name' | 'approved';

export interface AllWithBookMarkCount {
  allCount: number;
  bookMarkedCount: number;
}

export function getEmptyAllWithBookMarkCount(): AllWithBookMarkCount {
  return {
    allCount: 0,
    bookMarkedCount: 0,
  };
}
export interface FieldItem {
  id: string;
  title: string;
  order: number;
  communityCount: number;
  joinedCommunityCount: number;
  notJoinedCommunityCount: number;
}

export interface OpenCommunityItem {
  bookmarked: boolean;
  communityId: string;
  thumbnailId: string;
  name: string;
  managerName: string;
  managerEmail: string;
  memberCount: number;
  hasNewPost: boolean;
  type: CommunityType;
  fieldName: string;
  description: string;
  approvedState: CommunityMemberApprovedType;
  managerNickName: string;
}

export interface MainOpenCommunities {
  fieldItems: FieldItem[];
  items: OpenCommunityItem[];
  sort: sort;
  totalCount: number;
  index: number;
  fieldId?: string;
  ingRequest: boolean;
}

export function getEmptyMainOpenCommunities(): MainOpenCommunities {
  return {
    fieldItems: [],
    items: [],
    sort: 'createdTime',
    totalCount: 0,
    index: 0,
    fieldId: 'all',
    ingRequest: false,
  };
}

export function communityViewToOpenCommunityItem(
  communityView: CommunityView,
): OpenCommunityItem {
  const {
    communityId,
    thumbnailId,
    name,
    managerName,
    managerEmail,
    memberCount,
    type,
    lastPostTime,
    approved,
    fieldName,
    description,
    managerNickName,
    bookmarked,
  } = communityView;

  return {
    fieldName: fieldName || '',
    bookmarked,
    communityId,
    description,
    type,
    thumbnailId,
    name,
    managerName: managerName || '',
    managerEmail,
    memberCount,
    hasNewPost: dayjs().startOf('day').valueOf() < (lastPostTime || 0),
    approvedState: approved,
    managerNickName: managerNickName || '',
  };
}
