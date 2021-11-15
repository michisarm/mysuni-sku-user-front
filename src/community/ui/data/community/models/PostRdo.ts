import { PostOrder } from './PostOrder';

export interface PostRdo {
  searchTitle?: string;
  searchGubun?: SearchGubun;
  orderNotContainPinned?: boolean;
  sort: PostOrder;
  startDate?: number;
  endDate?: number;
  hasRelatedCards?: boolean;
  limit: number;
  offset: number;
}

export type SearchGubun = 'all' | 'title' | 'content' | 'nickname';
