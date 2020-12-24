import { modifyHome } from 'community/api/communityApi';
import { setCommunityAdminHome } from 'community/store/CommunityAdminHomeStore';

export function adminHomeSave(communityId: string, homeId?: string) {
  modifyHome(communityId).then(res => res.setCommunityAdminHome(res.data))
}