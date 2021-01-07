import moment from "moment";

export interface SearchBox {
  approved?: boolean;
  startDate?: number;
  endDate?: number;
  offset?: number;
  limit?: number;
  companyName?: string;
  name?: string;
  teamName?: string;
  email?: string;
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
