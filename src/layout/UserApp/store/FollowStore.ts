import { createStore } from './Store';
import { FollowModel } from '../model/FollowModel';

const [setFollowModel, onFollowModel, getFollowModel, useFollowModel] =
  createStore<FollowModel>();

export { setFollowModel, onFollowModel, getFollowModel, useFollowModel };
