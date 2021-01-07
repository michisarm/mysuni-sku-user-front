import { onCommunityAdminMenu, setCommunityAdminMenu } from 'community/store/CommunityAdminMenuStore';
import {
  onCommunityPostListItem,
  setCommunityPostListItem,
} from 'community/store/CommunityPostListStore';
import { CommunityAdminMenu } from 'community/viewModel/CommunityAdminMenu';
import { CommunityPostList } from 'community/viewModel/CommunityPostList';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

type communityAdminMenu = CommunityAdminMenu | undefined;

interface Params {
  communityId: string;
  menuId: string;
}

export function useCommunityAdminMenu(): [communityAdminMenu] {
  const subscriberIdRef = useRef<number>(0);
  const [subscriberId, setSubscriberId] = useState<string>();
  const [menuItems, setMenuItems] = useState<communityAdminMenu>();

  const { communityId } = useParams<Params>();

  // const params = useParams<PostParams>();

  useEffect(() => {
    const next = `useCommunityAdminMenu-${++subscriberIdRef.current}`;
    setSubscriberId(next);
  }, []);

  useEffect(() => {
    if (subscriberId === undefined) {
      return;
    }
    return onCommunityAdminMenu(next => {
      if (next !== undefined) {
        setMenuItems(next);
      }
    }, subscriberId);
  }, [subscriberId]);


  useEffect(() => {
    if (communityId === undefined) {
      return;
    }

    setCommunityAdminMenu({
      menu: []
    });
  }, [communityId]);

  return [menuItems];
}
