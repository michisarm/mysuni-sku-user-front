import moment from "moment";

export interface SearchBox {
  communityId?: string;
  approved?: boolean;
  startDate?: number;
  endDate?: number;
  offset?: number;
  limit?: number;
  companyName?: string;
  name?: string;
  teamName?: string;
  email?: string;

  groupId?: string;
  groupMemberIdList?: (string | undefined)[];
}

export function getEmptySearchBox(approveMember?:boolean,groupId?:string): SearchBox {
  return {
    startDate: moment().startOf('day').subtract(1, 'y').toDate().getTime(),
    endDate: moment().endOf('day').toDate().getTime(),
    limit: 20,
    approved : approveMember||false,
    groupId
  };
}

export function getEmptyGroupSearchBox(): SearchBox {
  return {
    limit: 20,
  };  
}

export function getEmptyGroupDetailSearchBox(communityId?:string, groupId?: string, ): SearchBox {
  return {
    communityId: communityId||'',
    groupId: groupId||'',
    limit: 20,
  };  
}

