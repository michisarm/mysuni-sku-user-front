import { createStore } from './Store';
import { ProfileInfoCommunities } from 'layout/UserApp/model/CommunityModel';

const [
  setProfileInfoCommunityModel,
  onProfileInfoCommunityModel,
  getProfileInfoCommunityModel,
  useProfileInfoCommunityModel
] = createStore<ProfileInfoCommunities>();

export {
  setProfileInfoCommunityModel,
  onProfileInfoCommunityModel,
  getProfileInfoCommunityModel,
  useProfileInfoCommunityModel
}