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
  nickname?: string;

  groupId?: string;
  groupMemberIdList?: (string | undefined)[];
}

export function getEmptySearchBox(approveMember?:boolean, type?: string): SearchBox {
  if (type === 'survey') {
    return {
      startDate: moment().startOf('day').subtract(1, 'y').toDate().getTime(),
      endDate: moment().endOf('day').toDate().getTime(),
    };
  } else {
    return {
      startDate: moment().startOf('day').subtract(6, 'd').toDate().getTime(),
      endDate: moment().endOf('day').toDate().getTime(),
      limit: 20,
      approved : approveMember||false
    };
  }
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