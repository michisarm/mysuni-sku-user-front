import { createStore } from './Store';
import { Follows } from 'community/ui/data/community/models/Follows';

const [setFollowModel, onFollowModel, getFollowModel, useFollowModel] =
  createStore<Follows[]>();

export { setFollowModel, onFollowModel, getFollowModel, useFollowModel };
