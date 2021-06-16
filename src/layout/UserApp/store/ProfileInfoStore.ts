import { createStore } from './Store';
import ProfileInfoModel from 'layout/UserApp/model/ProfileInfoModel';

const [
  setProfileInfoModel,
  onProfileInfoModel,
  getProfileInfoModel,
  useProfileInfoModel
] = createStore<ProfileInfoModel>();

export {
  setProfileInfoModel,
  onProfileInfoModel,
  getProfileInfoModel,
  useProfileInfoModel
}