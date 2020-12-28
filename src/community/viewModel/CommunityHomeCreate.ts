import CommunityHomeType from "community/model/CommunityHomeType";

export interface CommunityHomeCreateItem {
  communityId: string;
  id?: string;
  type: CommunityHomeType;
  introduce?: string;
  thumbnailId?: string;
  html?: string;
  draft?: number;
}


export function getEmptyCommunityHomeCreateItem(communityId:string): CommunityHomeCreateItem {
  return {
    communityId,
    type: 'BASIC'
  };
}