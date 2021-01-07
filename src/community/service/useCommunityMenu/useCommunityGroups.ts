import { onCommunityAdminGroupsStore, setCommunityAdminGroupsStore } from "community/store/CommunityAdminGroupsStore";
import { onCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { onCommunityPostDetailItem, setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { GroupList } from "community/viewModel/CommunityAdminMenu";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';
import { getCommunityPostDetail } from "../useCommunityPostCreate/utility/getCommunityPostDetail";
import { requestCommunityGroups } from "./requestCommunity";

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
      if(communityId === undefined) {
        return
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
        setGroupListItem(next)
      }, subscriberId);
    }, [subscriberId]);
  
    return [GroupListItem];
}