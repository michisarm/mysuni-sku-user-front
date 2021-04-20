import { useEffect, useRef, useState } from 'react';
import { onCommunityDiscussionDetailItem } from '../../store/CommunityDiscussionDetailStore';
import { CommunityDiscussionDetail } from '../../viewModel/CommunityDiscussionDetail';
import { getCommunityDiscussion } from '../useCommunityPostCreate/utility/getDiscussionDetail';

type PostDetailValue = CommunityDiscussionDetail | undefined;

export function useCommunityDiscussionPostDetail(
  menuId: string
): [PostDetailValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [PostDetailValue, setPostDetailValue] = useState<
    CommunityDiscussionDetail
  >();

  useEffect(() => {
    getCommunityDiscussion(menuId);
  }, [menuId]);

  useEffect(() => {
    const next = `useCommunityPostDetail-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onCommunityDiscussionDetailItem(next => {
      setPostDetailValue(next);
    }, subscriberId);
  }, [subscriberId]);

  return [PostDetailValue];
}
