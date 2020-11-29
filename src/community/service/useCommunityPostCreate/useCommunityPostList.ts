import {
  onCommunityPostListItem,
  onCommunityPostMenuName,
  setCommunityPostListItem,
} from 'community/store/CommunityPostListStore';
import { CommunityPostList } from 'community/viewModel/CommunityPostList';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type PostListValue = CommunityPostList | undefined;

interface Params {
  communityId: string;
  menuId: string;
}

export function useCommunityPostList(): [PostListValue] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [postItems, setPostItems] = useState<PostListValue>();

  const { communityId, menuId } = useParams<Params>();

  // const params = useParams<PostParams>();

  useEffect(() => {
    const next = `useCommunityPostList-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onCommunityPostListItem(next => {
      if (next !== undefined) {
        setPostItems(next);
      }
    }, subscriberId);
  }, [subscriberId]);


  useEffect(() => {
    if (communityId === undefined) {
      return;
    }

    setCommunityPostListItem({
      items: [],
      totalCount: 0,
      empty: false,
      offset: 0,
      limit: 10,
      sortType: '',
      searchType: '',
      searchText: '',
    });
  }, [communityId, menuId]);

  return [postItems];
}
