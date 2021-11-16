import { useRequestMainFollow } from './follow.request.services';
import { useRef } from 'react';
import React from 'react';
import { Sticky, Menu, Segment } from 'semantic-ui-react';
import { Area } from '../../../../tracker/model/ActionType';
import { Link } from 'react-router-dom';
import {
  MAIN_MYCOMMUNITIES_PATH,
  MAIN_OPENCOMMUNITIES_PATH,
  MAIN_MYFEED_PATH,
  MAIN_FOLLOWFEED_PATH,
  MAIN_BOOKMARK_PATH,
} from '../../page/MainRoutes';
import { NoFollowView } from './NoFollowView';
import { FollowPostListView } from './FollowPostListView';
import { FollowListView } from './FollowListView';
import CommunityHomeBreadcrumb from '../CommunityHomeBreadcrumb';

export function FollowPage() {
  useRequestMainFollow();
  const contextRef = useRef(null);
  CommunityHomeBreadcrumb('Follower Feed');
  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner" data-area={Area.COMMUNITY_MENU}>
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={false}
              as={Link}
              to={MAIN_MYCOMMUNITIES_PATH}
            >
              My Community
            </Menu.Item>
            <Menu.Item
              name="MyCreatedCommunity"
              active={false}
              as={Link}
              to={MAIN_OPENCOMMUNITIES_PATH}
            >
              Community List
            </Menu.Item>
            <Menu.Item
              name="MyFeed"
              active={false}
              as={Link}
              to={MAIN_MYFEED_PATH}
            >
              My Feed
            </Menu.Item>
            <Menu.Item
              name="Follow"
              active={true}
              as={Link}
              to={MAIN_FOLLOWFEED_PATH}
            >
              Follower Feed
            </Menu.Item>
            <Menu.Item
              name="BookMark"
              active={false}
              as={Link}
              to={MAIN_BOOKMARK_PATH}
            >
              Bookmark
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <FollowPostListView />
          <FollowListView />
          <NoFollowView />
        </div>
      </Segment>
    </div>
  );
}
