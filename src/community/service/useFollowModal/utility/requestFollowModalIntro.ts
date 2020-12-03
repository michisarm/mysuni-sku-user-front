import { followersModal, followingsModal, followModalAdd, followModalDelete } from '../../../api/communityApi';
import FollowModalItem from '../../../viewModel/FollowModalIntro/FollowModalItem';
import {
  setFollowersModal,
  getFollowersModal,
  getFollowingsModal,
  setFollowingsModal,
} from '../../../store/CommunityFollowModalStore';

export function requestFollowersModal() {
  followersModal().then(lists => {
    const followMadalIntro = getFollowersModal() || {
      followers: [],
      followings: [],
    }
    if (lists === undefined) {
      setFollowersModal({
        ...followMadalIntro,
        followers: [],
        followings: [],
      });
    }
    else {
      const next: FollowModalItem[] = [];
      lists.results.map(item => (
        next.push(item)
      ))
      setFollowersModal({
        ...followMadalIntro,
        followers: next,
      });
    }
  })
}

export function requestFollowingsModal() {
  followingsModal().then(lists => {
    const followMadalIntro = getFollowingsModal() || {
      followers: [],
      followings: [],
    }
    if (lists === undefined) {
      setFollowingsModal({
        ...followMadalIntro,
        followers: [],
        followings: [],
      });
    }
    else {
      const next: FollowModalItem[] = [];
      lists.results.map(item => (
        next.push(item)
      ))
      setFollowingsModal({
        ...followMadalIntro,
        followings: next,
      });
    }
  })
}



export async function requestFollowModalAdd(id: string) {
  await followModalAdd(id);
  requestFollowingsModal();
}

export async function requestFollowModalDelete(id: string) {
  await followModalDelete(id);
  requestFollowingsModal();
}