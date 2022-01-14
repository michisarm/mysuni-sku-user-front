import { CardState } from 'lecture/model/CardState';

export interface LectureCardRdo {
  offset: number;
  limit: number;
  name?: string;
  collegeIds: string;
  channelIds: string;
  creatorName?: string;
  startDate?: number;
  endDate?: number;
  hasStamp?: boolean;
  searchable?: boolean;
  cardType?: string;
  sharedOnly?: boolean;
  userGroupSequences?: number[];
  cardOrderBy?: SortFilterState;
  cardState?: CardState;
}

export type SortFilterState = 'TimeDesc' | 'TimeAsc'; //최신 등록순 오래된 등록순
