import moment from "moment";
import { CommunityMemberApprovedType } from "./CommunityMember";

export interface SearchBox {
  communityId?: string;
  approved?: CommunityMemberApprovedType;
  startDate?: number;
  endDate?: number;
  offset?: number;
  limit?: number;
  companyName?: string;
  name?: string;
  teamName?: string;
  email?: string;
  nickname?: string;

  groupId?: string;
  groupMemberIdList?: (string | undefined)[];
}

export function getEmptySearchBox(approveMember?: CommunityMemberApprovedType, groupId?: string): SearchBox {
  return {
    startDate: moment().startOf('day').subtract(1, 'y').toDate().getTime(),
    endDate: moment().endOf('day').toDate().getTime(),
    limit: 20,
    approved: approveMember,
  };
}

export function getEmptyGroupSearchBox(): SearchBox {
  return {
    limit: 20,
  };
}

export function getEmptyGroupDetailSearchBox(communityId?: string, groupId?: string,): SearchBox {
  return {
    communityId: communityId || '',
    groupId: groupId || '',
    limit: 20,
  };
}

