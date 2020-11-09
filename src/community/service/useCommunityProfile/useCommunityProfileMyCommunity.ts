import { onCommunityMyCommunityItem } from "community/store/CommunityProfileMyCommunityStore";
import { onCommunityProfileItem } from "community/store/CommunityProfileStore";
import {CommunityProfileMyCommunity} from "community/viewModel/CommunityProfile";
import { useEffect, useState } from "react";

type MyCommunityValue = CommunityProfileMyCommunity | undefined;


let subscriberIdRef = 0;

export function useCommunityProfileMyCommunity(): [MyCommunityValue] {

    const [subscriberId, setSubscriberId] = useState<string>();
    const [myCommunityValue, setMyCommunityValue] = useState<MyCommunityValue>();

    useEffect(() => {
      const next = `useCommunityProfile-${++subscriberIdRef}`;
      setSubscriberId(next);
    }, []);

    useEffect(() => {
      if (subscriberId === undefined) {
        return;
      }
      return onCommunityMyCommunityItem(next => {
        setMyCommunityValue(next);
        console.log('CommunityProfileMyCommunityItem', next);
      }, subscriberId);
    }, [subscriberId]);
  
    return [myCommunityValue];
}