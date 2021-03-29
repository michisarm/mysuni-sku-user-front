import { onCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { onCommunityPostDetailItem, setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';
import { getCommunityPostDetailWithIncreaseReadCount } from "../useCommunityPostCreate/utility/getCommunityPostDetail";

type PostDetailValue = CommunityPostDetail | undefined;

export function useCommunityPostDetail(communityId: string, postId: string): [PostDetailValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [PostDetailValue, setPostDetailValue] = useState<CommunityPostDetail>();

  useEffect(() => {
    if (communityId === undefined || postId === undefined) {
      return
    }
    getCommunityPostDetailWithIncreaseReadCount(communityId, postId);
  }, [communityId, postId]);

  useEffect(() => {
    const next = `useCommunityPostDetail-${++subscriberIdRef.current}`;
    setCommunityPostDetailItem({
      id: '',
      postId: '',
      communityId: '',
      menuId: '',
      title: '',
      html: '',
      likeCount: 0,
      replyCount: 0,
      fileBoxId: '',
      commentFeedbackId: '',
      pinned: false,
      readCount: 0,
      visible: false,
      creatorId: '',
      creatorName: '',
      createdTime: 0,
      modifierId: '',
      modifiedTime: 0,
      nickName: '',
      introduce: '',
      profileImg: '',
      creatorCompanyName: '',
      content: '',
      relatedUrlList: {title: '', url: ''}
    })
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onCommunityPostDetailItem(next => {
      if (next !== undefined) {
        setPostDetailValue(next)
      }
    }, subscriberId);
  }, [subscriberId]);

  useEffect(() => {
    if (communityId === undefined || postId === undefined) {
      return
    }
    getCommunityPostDetailWithIncreaseReadCount(communityId, postId);
  }, [communityId, postId]);

  return [PostDetailValue];
}
