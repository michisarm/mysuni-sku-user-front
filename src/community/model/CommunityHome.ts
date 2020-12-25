import CommunityHomeType from './CommunityHomeType';

export default interface CommunityHomeInfo {
  communityId: string;
  id?:string;
  type: CommunityHomeType;
  introduce: string;
  thumbnailId: string;
  html: string;
  draft: number;
}
