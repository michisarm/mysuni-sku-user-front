import { getDenizedId } from 'community/ui/app.formatters';
import { findFollowingUsers } from 'community/ui/data/community/apis/followApi';
import { recommendPlaylist } from 'playlist/data/apis';
import { useEffect } from 'react';
import {
  followingToMemberList,
  setFollowingList,
} from './playlistRecommendPopUp.store';

export function requestRecommendPlaylist(
  denizenIds: string[],
  playlistId: string,
  recommendation: string
) {
  recommendPlaylist({
    denizenIds,
    playlistId,
    recommendation,
  });
}

export function requestDepartMentUser() {}

export function requestMySuniUser() {}

// following tab 데이터 호출
export async function requestFollowing() {
  const memberId = getDenizedId();
  const followingUser = await findFollowingUsers(memberId);

  if (followingUser !== undefined) {
    const memberList = followingToMemberList(followingUser.results);
    setFollowingList(memberList);
  }
}

export function useRequestFollowing() {
  useEffect(() => {
    requestFollowing();
    return () => {
      setFollowingList([]);
    };
  }, []);
}
