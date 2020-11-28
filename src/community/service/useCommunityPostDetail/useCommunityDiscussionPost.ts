import { onCommunityPostDetailItem, setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { useEffect, useRef, useState } from "react";
import { getCommunityPost } from "../useCommunityPostCreate/utility/getCommunityPost";

type PostDetailValue = CommunityPostDetail | undefined;

export function useCommunityDiscussionPostDetail(menuId: string): [PostDetailValue] {
    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [PostDetailValue, setPostDetailValue] = useState<CommunityPostDetail>();
    
    useEffect(() => {
      getCommunityPost(menuId);
    }, []);

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