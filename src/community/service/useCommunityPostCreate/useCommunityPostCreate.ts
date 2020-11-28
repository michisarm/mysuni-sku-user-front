import { onCommunityPostCreateItem } from 'community/store/CommunityPostCreateStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';
import { getCommunityPostCreate } from './utility/getCommunityPostCreate';

type PostCreateValue = CommunityPostCreateItem | undefined;

let subscriberIdRef = 0;
export function useCommunityPostCreate(
  postId?: string
): [PostCreateValue] {
  const [subscriberId, setSubscriberId] = useState<string>();
  const [postCreateValue, setPostCreateValue] = useState<PostCreateValue>();

  const getCommunityPostItem = useCallback(
    (postId?: string) => {
      getCommunityPostCreate(postId);
    },
    []
  );

  useEffect(() => {
    getCommunityPostItem(postId);
  }, []);

  useEffect(() => {
    const next = `useCommunityPostCreate-${++subscriberIdRef}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onCommunityPostCreateItem(next => {
      setPostCreateValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [postCreateValue];
}
