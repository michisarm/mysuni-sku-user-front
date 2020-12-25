import { modifyHome } from 'community/api/communityApi';
import { setCommunityAdminHome } from 'community/store/CommunityAdminHomeStore';

// 저장하기  
export function adminHomeSave(communityId: string, homeId?: string) {
  modifyHome(communityId).then(res => res.setCommunityAdminHome(res.data))
}