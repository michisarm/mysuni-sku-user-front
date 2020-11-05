import { onCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';

type PostCreateValue = CommunityPostCreateItem | undefined;

export function useCommunityPostCreate(): [PostCreateValue] {
    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [postCreateValue, setPostCreateValue] = useState<PostCreateValue>();

    useEffect(() => {
      const next = `useCommunityPostCreate-${++subscriberIdRef.current}`;
      setSubscriberId(next);
    }, []);

    useEffect(() => {
      if (subscriberId === undefined) {
        return;
      }
      return onCommunityPostCreateItem(next => {
        setPostCreateValue(next);
        console.log('CommunityPostCreateItem', next);
      }, subscriberId);
    }, [subscriberId]);
  
    return [postCreateValue];
}