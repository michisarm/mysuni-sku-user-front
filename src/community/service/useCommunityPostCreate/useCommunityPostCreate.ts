import { onCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';
import { getCommunityPostCreate } from "./utility/getCommunityPostCreate";

type PostCreateValue = CommunityPostCreateItem | undefined;

export function useCommunityPostCreate(communityId:string, postId?:string): [PostCreateValue] {
    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [postCreateValue, setPostCreateValue] = useState<PostCreateValue>();

    const getCommunityPostItem = useCallback((communityId: string, postId?: string) => {
        getCommunityPostCreate(communityId, postId);
    }, []);

    useEffect(() => {
        getCommunityPostItem(communityId,postId);
    }, []);

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