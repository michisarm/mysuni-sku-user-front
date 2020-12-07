import { onCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { onCommunityPostDetailItem, setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';
import { getCommunityPostDetail } from "../useCommunityPostCreate/utility/getCommunityPostDetail";

type PostDetailValue = CommunityPostDetail | undefined;

export function useCommunityPostDetail(communityId: string, postId: string): [PostDetailValue] {
    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [PostDetailValue, setPostDetailValue] = useState<CommunityPostDetail>();
    
    useEffect(() => {
      if(communityId === undefined || postId === undefined) {
        return
      }
      getCommunityPostDetail(communityId, postId);
    }, [communityId, postId]);

    useEffect(() => {
      const next = `useCommunityPostDetail-${++subscriberIdRef.current}`;
      setSubscriberId(next);
    }, []);

    useEffect(() => {
      if (subscriberId === undefined) {
        return;
      }
      return onCommunityPostDetailItem(next => {
        setPostDetailValue(next)
      }, subscriberId);
    }, [subscriberId]);
  
    return [PostDetailValue];
}