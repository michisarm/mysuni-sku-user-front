import moment from 'moment';

export interface SearchBox {
  content?: string;
  cubeName?: string;
  cubeId?: string;
  cardId?: string;
  folderId?: string;
  collegeId?: string;
  offset?: number;
  limit?: number;
  startDate?: number;
  endDate?: number;
}

export function getEmptySearchBox(): SearchBox {
  return {
    limit: 10,
    offset: 0,
    content: '',
    cubeName: '',
    collegeId: '',
    startDate: moment().startOf('day').subtract(1, 'year').toDate().getTime(),
    endDate: moment().endOf('day').toDate().getTime(),
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
