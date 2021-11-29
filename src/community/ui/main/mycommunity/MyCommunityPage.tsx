import React, { useRef, useEffect, useContext } from 'react';
import { Sticky, Menu, Segment } from 'semantic-ui-react';
import { Area } from '../../../../tracker/model/ActionType';
import { Link, useLocation } from 'react-router-dom';
import {
  MAIN_MYCOMMUNITIES_PATH,
  MAIN_OPENCOMMUNITIES_PATH,
  MAIN_MYFEED_PATH,
  MAIN_FOLLOWFEED_PATH,
  MAIN_BOOKMARK_PATH,
} from '../../page/MainRoutes';
import { MyCommunityListView } from './MyCommunityListView';
import { useRequestMainMyCommunityItems } from './services/mycommunity.request.services';
import { MyCommunityPostListView } from './MyCommunityPostListView';
import { checkExternalInstructor } from '../../app.services';

export function MyCommunityPage() {
  const contextRef = useRef(null);
  useRequestMainMyCommunityItems();

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner" data-area={Area.COMMUNITY_MENU}>
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={true}
              as={Link}
              to={MAIN_MYCOMMUNITIES_PATH}
            >
              My Community
            </Menu.Item>
            {!checkExternalInstructor() && (
              <Menu.Item
                name="MyCreatedCommunity"
                active={false}
                as={Link}
                to={MAIN_OPENCOMMUNITIES_PATH}
              >
                Community List
              </Menu.Item>
            )}
            <Menu.Item
              name="MyFeed"
              active={false}
              as={Link}
              to={MAIN_MYFEED_PATH}
            >
              My Feed
            </Menu.Item>
            {!checkExternalInstructor() && (
              <Menu.Item
                name="Follow"
                active={false}
                as={Link}
                to={MAIN_FOLLOWFEED_PATH}
              >
                Follower Feed
              </Menu.Item>
            )}
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

      {/* 컨텐츠 영역 */}
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <MyCommunityListView />
          <MyCommunityPostListView />
        </div>
      </Segment>
    </div>
  );
}
