import { createStore } from '../../packages/store/createStore';
import { CommunityView } from '../data/community/models/CommunityView';
import { OffsetElementList } from '../data/accent/models/OffsetElementList';
import { Post } from '../data/community/models/Post';
import { ProfileInfo } from './userProfileInfo.models';
import { Follows } from '../data/community/models/Follows';

export const [
  useUserProfileInfo,
  setUserProfileInfo,
  getUserProfileInfo,
  onUserProfileInfo,
] = createStore<ProfileInfo>();

export const [
  useUserCommunityList,
  setUserCommunityList,
  getUserCommunityList,
  onUserCommunityList,
] = createStore<OffsetElementList<CommunityView>>();

export const [
  useUserFeedList,
  setUserFeedList,
  getUserFeedList,
  onUserFeedList,
] = createStore<OffsetElementList<Post>>();

export const [
  useMyFollowList,
  setMyFollowList,
  getMyFollowList,
  onMyFollowList,
] = createStore<Follows[]>();

export const [
  useOpenHeaderUserProfileInfoProfileCardPopup,
  setOpenHeaderUserProfileInfoProfileCardPopup,
  getOpenHeaderUserProfileInfoProfileCardPopup,
  onOpenHeaderUserProfileInfoProfileCardPopup,
] = createStore<boolean>();
