import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Sticky } from 'semantic-ui-react';
import { checkExternalInstructor } from '../../app.services';
import {
  MAIN_BOOKMARK_PATH,
  MAIN_FOLLOWFEED_PATH,
  MAIN_MYCOMMUNITIES_PATH,
  MAIN_MYFEED_PATH,
  MAIN_OPENCOMMUNITIES_PATH,
} from '../../page/MainRoutes';
import { Area } from '../../../../tracker/model/ActionType';
import { BookMarkListView } from './BookMarkListView';
import CommunityHomeBreadcrumb from '../CommunityHomeBreadcrumb';

export function BookMarkPage() {
  const contextRef = useRef(null);
  CommunityHomeBreadcrumb('Bookmark');
  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={false}
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
              active={true}
              as={Link}
              to={MAIN_BOOKMARK_PATH}
            >
              Bookmark
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
      <div>
        <Segment className="full">
          <div
            className="course-detail-center community-containter"
            style={{ display: 'block' }}
            data-area={Area.COMMUNITY_BOOKMARK}
          >
            <BookMarkListView />
          </div>
        </Segment>
      </div>
    </div>
  );
}
