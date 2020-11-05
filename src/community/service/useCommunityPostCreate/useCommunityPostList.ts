import { onCommunityPostCreateItem } from "community/store/CommunityPostCreateStore";
import { onCommunityPostListItem, setCommunityPostListItem } from "community/store/CommunityPostListStore";
import { SortType } from "community/ui/logic/CommunityPostListContainer";
import { CommunityPostList } from "community/viewModel/CommunityPostList";
import { param } from "jquery";
import LectureParams from "lecture/detail/viewModel/LectureParams";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CommunityPostCreateItem } from '../../viewModel/CommunityPostCreate';

type PostListValue = CommunityPostList | undefined;

interface Params {
  communityId: string;
  menuId: string;
}

export function useCommunityPostList(sorType:SortType): [PostListValue] {
    const subscriberIdRef = useRef<number>(0);
    const [subscriberId, setSubscriberId] = useState<string>();
    const [postItems, setPostItems] = useState<PostListValue>();

    const { communityId, menuId } = useParams<Params>()

    // const params = useParams<PostParams>();
    
    useEffect(() => {
      const next = `useCommunityPostList-${++subscriberIdRef.current}`;
      setSubscriberId(next);
    }, []);

    useEffect(()=>{

    },[sorType])

    useEffect(() => {
      console.log('subscriberId', subscriberId)
      if (subscriberId === undefined) {
        return;
      }
      return onCommunityPostListItem(next => {
        console.log('CommunityPostCreateItem')
        if( next !== undefined) {
          setPostItems(next);
        }
        console.log('CommunityPostCreateItem', next);
      }, subscriberId);
    }, [subscriberId]);


    useEffect(() => {
      console.log('subscriberId', subscriberId)
      if (subscriberId === undefined) {
        return;
      }
      return onCommunityPostListItem(next => {
        console.log('CommunityPostCreateItem')
        if( next !== undefined) {
          setPostItems(next);
        }
        console.log('CommunityPostCreateItem', next);
      }, subscriberId);
    }, [subscriberId]);

    useEffect(() => {
      console.log('communityId', communityId)
      if (communityId === undefined) {
        return;
      }

      setCommunityPostListItem({
        items: [],
        totalCount: 0,
        empty: false,
        offset: 0,
        limit: 10,
        orderType: 'date',
        searchType: '',
        searchText: '',
      });


      console.log('communityId', communityId)
      console.log('menuId', menuId)

    }, [communityId, menuId]);
  
    return [postItems];
}