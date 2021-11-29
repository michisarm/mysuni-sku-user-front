import {
  findAllFollow,
  follow,
  unfollow,
} from '../data/community/apis/followApi';
import { getMain, setMain } from './main.services';
import { getEmptyMain, profileViewToModel, Main } from './main.models';
import {
  findFollowerUsers,
  findFollowingUsers,
} from '../data/community/apis/followApi';
import { findProfile } from '../data/community/apis/profilesApi';
import { profileImgToImage } from '../app/models/app.profile';
import { checkExternalInstructor } from '../app.services';
import { useEffect } from 'react';
import { getDenizedId, getProfileImage } from '../app.formatters';
import { parsePolyglotString } from '../../packages/polyglot/PolyglotString';

export async function requestFindFollowerAndFollowing() {
  if (checkExternalInstructor()) {
    return;
  }
  const memberId = getDenizedId();
  const followings = await findFollowingUsers(memberId);
  const followers = await findFollowerUsers(memberId);
  if (followings !== undefined && followers !== undefined) {
    const main = getMain() || getEmptyMain();

    const parseFollowersProfile = followers.results.map(profileViewToModel);
    const follows = await findAllFollow();

    parseFollowersProfile.forEach((follower) => {
      follower.follow = follows?.some(
        (item) => item.followingId === follower.id
      );
    });

    setMain({
      ...main,
      followerCount: followers.totalCount,
      followers: parseFollowersProfile,
      followingCount: followings.totalCount,
      followings: followings.results.map(profileViewToModel),
    });
  }
}

export async function requestFindFollowing() {
  if (checkExternalInstructor()) {
    return;
  }

  const memberId = getDenizedId();
  const followings = await findFollowingUsers(memberId);
  if (followings !== undefined) {
    const main = getMain() || getEmptyMain();
    setMain({
      ...main,
      followingCount: followings.totalCount,
      followings: followings.results.map(profileViewToModel),
    });
  }
}

export async function requestFindFollower() {
  if (checkExternalInstructor()) {
    return;
  }
  const memberId = getDenizedId();
  const followers = await findFollowerUsers(memberId);
  if (followers !== undefined) {
    const main = getMain() || getEmptyMain();
    const parseFollowersProfile = followers.results.map(profileViewToModel);
    const follows = await findAllFollow();

    parseFollowersProfile.forEach((follower) => {
      follower.follow = follows?.some(
        (item) => item.followingId === follower.id
      );
    });

    setMain({
      ...main,
      followerCount: followers.totalCount,
      followers: parseFollowersProfile,
    });
  }
}

export async function requestFollow(id: string) {
  if (checkExternalInstructor()) {
    return;
  }
  await follow(id);
  requestFindFollowerAndFollowing();
}

export async function requestUnfollow(id: string) {
  if (checkExternalInstructor()) {
    return;
  }
  await unfollow(id);
  requestFindFollowerAndFollowing();
}

export function useRequestMain() {
  useEffect(() => {
    findProfile().then((profile) => {
      if (profile !== undefined) {
        const {
          photoImagePath,
          gdiPhotoImagePath,
          useGdiPhoto,
          name,
          nickname,
          email,
          departmentName,
          companyName,
        } = profile;

        const main: Main = {
          profileImage: profileImgToImage(
            getProfileImage(photoImagePath, gdiPhotoImagePath, useGdiPhoto)
          ),
          profileName: parsePolyglotString(name),
          profileNickName: nickname,
          email,
          company: parsePolyglotString(companyName),
          department: parsePolyglotString(departmentName),
          followerCount: 0,
          followingCount: 0,
          followers: [],
          followings: [],
        };
        setMain(main);

        requestFindFollowerAndFollowing();
      }
    });
  }, []);
}
