import { onCommunityAdminHome } from 'community/store/CommunityAdminHomeStore';
import Home from 'community/model/Home';
import { useState, useEffect } from 'react';

type HomeValue = Home | undefined;

let subscriberIdRef = 0;

export function useCommunityAdminHome(): [HomeValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [homeValue, setHomeValue] = useState<HomeValue>();

  useEffect(() => {
    const next = `useCommunityAdminHome-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onCommunityAdminHome(next => {
      setHomeValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [homeValue];
}
