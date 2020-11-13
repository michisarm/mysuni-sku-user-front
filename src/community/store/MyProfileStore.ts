import Profile from '../model/Profile';
import { createStore } from './Store';

const [setMyProfile, onMyProfile, getMyProfile, useMyProfile] = createStore<
  Profile
>();

export { setMyProfile, onMyProfile, getMyProfile, useMyProfile };
