import { createStore } from './Store';
import { PostModel, CommunityProfileFeed } from 'layout/UserApp/model/PostModel';

const [
  setProfileInfoPostModel,
  onProfileInfoPostModel,
  getProfileInfoPostModel,
  useProfileInfoPostModel
] = createStore<CommunityProfileFeed>();

export {
  setProfileInfoPostModel,
  onProfileInfoPostModel,
  getProfileInfoPostModel,
  useProfileInfoPostModel
}