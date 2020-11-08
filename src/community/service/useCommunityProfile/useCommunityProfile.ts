import { onCommunityProfileItem } from "community/store/CommunityProfileStore";
import {CommunityProfile} from "community/viewModel/CommunityProfile";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCommunityProfile } from "./utility/getCommunityProfile";

type ProfileValue = CommunityProfile | undefined;


let subscriberIdRef = 0;

export function useCommunityProfile(): [ProfileValue] {

    const [subscriberId, setSubscriberId] = useState<string>();
    const [profileValue, setProfileValue] = useState<ProfileValue>();

    useEffect(() => {
      const next = `useCommunityProfile-${++subscriberIdRef}`;
      setSubscriberId(next);
    }, []);

    useEffect(() => {
      if (subscriberId === undefined) {
        return;
      }
      return onCommunityProfileItem(next => {
        setProfileValue(next);
        console.log('CommunityProfileItem', next);
      }, subscriberId);
    }, [subscriberId]);
  
    return [profileValue];
}