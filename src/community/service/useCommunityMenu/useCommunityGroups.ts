import { onCommunityAdminGroupsStore } from 'community/store/CommunityAdminGroupsStore';
import { GroupList } from 'community/viewModel/CommunityAdminMenu';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestCommunityGroups } from './requestCommunity';

type GroupListItem = GroupList | undefined;

interface Params {
  communityId: string;
}

export function useCommunityGroups(): [GroupListItem] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [GroupListItem, setGroupListItem] = useState<GroupListItem>();

  const { communityId } = useParams<Params>();

  useEffect(() => {
    if (communityId === undefined) {
      return;
    }
    requestCommunityGroups(communityId);
  }, [communityId]);

  useEffect(() => {
    const next = `useCommunityGroups-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onCommunityAdminGroupsStore(next => {
      setGroupListItem(next);
    }, subscriberId);
  }, [subscriberId]);

  return [GroupListItem];
}
