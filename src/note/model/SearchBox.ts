import moment from "moment";

export interface SearchBox {
  content?: string;
  title?: string;
  cubeId?: string;
  cardId?: string;
  folderId?: string;
  collegeId?: string;
  channelId?: string;
  offset?: number;
  limit?: number;
  createStartDate?: number;
  createEndDate?: number;
}

export function getEmptySearchBox(): SearchBox {
  return {
    limit: 10,
    offset: 0,
    content: '',
    title: '',
    collegeId: '',
    channelId: '',
    createStartDate: moment()
      .startOf('day')
      .subtract(6, 'd')
      .toDate()
      .getTime(),
    createEndDate: moment()
      .endOf('day')
      .toDate()
      .getTime(),
  };
}

// export function getEmptySearchBox(
//   approveMember?: CommunityMemberApprovedType,
//   groupId?: string
// ): SearchBox {
//   return {
//     startDate: moment()
//       .startOf('day')
//       .subtract(1, 'y')
//       .toDate()
//       .getTime(),
//     endDate: moment()
//       .endOf('day')
//       .toDate()
//       .getTime(),
//     limit: 20,
//     approved: approveMember,
//   };
// }

// export function getEmptyGroupSearchBox(): SearchBox {
//   return {
//     limit: 20,
//   };
// }

// export function getEmptyGroupDetailSearchBox(
//   communityId?: string,
//   groupId?: string
// ): SearchBox {
//   return {
//     communityId: communityId || '',
//     groupId: groupId || '',
//     limit: 20,
//   };
// }
