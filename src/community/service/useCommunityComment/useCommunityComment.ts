import { onCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { onCommunityPostDetailItem, setCommunityPostDetailItem } from "community/store/CommunityPostDetailStore";
import { CommunityComment } from "community/viewModel/CommunityComment";
import { CommunityPostDetail } from "community/viewModel/CommunityPostDetail";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';
import { getCommunityPostDetail } from "../useCommunityPostCreate/utility/getCommunityPostDetail";
import { getCommunityComment } from "./utility/getCommunityComment";

type commentValue = CommunityComment | undefined;

export function useCommunityComment(commentFeedbackId: string): [commentValue] {
    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [commentValue, setCommentValue] = useState<CommunityComment>();
    
    useEffect(() => {
      getCommunityComment(commentFeedbackId);
    }, []);

    useEffect(() => {
      const next = `useCommunityComment-${++subscriberIdRef.current}`;
      setSubscriberId(next);
    }, []);

    useEffect(() => {
      if (subscriberId === undefined) {
        return;
      }
      console.log(subscriberId)
      // return onCommunityPostDetailItem(next => {
      //   setCommentValue(next)
      // }, subscriberId);
    }, [subscriberId]);
  
    return [commentValue];
}