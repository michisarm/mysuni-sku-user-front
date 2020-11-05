import { onCommunityProfile } from "community/store/CommunityProfileStore";
import CommunityProfile from "community/viewModel/CommunityProfile";
import { useCallback, useEffect, useRef, useState } from "react";

type ProfileValue = CommunityProfile | undefined;

export function useCommunityProfile(): [ProfileValue] {

    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [postCreateValue, setProfileValue] = useState<ProfileValue>();

    const getCommunityPostItem = useCallback((communityId: string, postId?: string) => {
        // getCommunityProfile(communityId, postId);
    }, []);

    useEffect(() => {
        // getCommunityPostItem(communityId,postId);
    }, []);

    useEffect(() => {
      const next = `useCommunityProfile-${++subscriberIdRef.current}`;
      setSubscriberId(next);
    }, []);

    useEffect(() => {
      if (subscriberId === undefined) {
        return;
      }
      return onCommunityProfile(next => {
        setProfileValue(next);
        console.log('CommunityProfileItem', next);
      }, subscriberId);
    }, [subscriberId]);
  
    return [postCreateValue];
}