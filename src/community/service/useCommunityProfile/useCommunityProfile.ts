import { onCommunityProfile } from "community/store/CommunityProfileStore";
import CommunityProfile from "community/viewModel/CommunityProfile";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCommunityProfile } from "./utility/getCommunityProfile";

type ProfileValue = CommunityProfile | undefined;

export function useCommunityProfile(): [ProfileValue] {

    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [profileValue, setProfileValue] = useState<ProfileValue>();

    const getCommunityProfileItem = useCallback(() => {
      getCommunityProfile();
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
  
    return [profileValue];
}