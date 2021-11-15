import React, { useRef } from 'react';
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
import { OpenCommunityFieldItemsView } from './OpenCommunityFieldItemsView';
import { NoOpenCommunityView } from './NoOpenCommunityView';
import { OpenCommunityListHeaderView } from './OpenCommunityListHeaderView';
import { OpenCommunityListView } from './OpenCommunityListView';

export default function OpenCommunityPage() {
  const contextRef = useRef(null);

  //   ga 유지 여부 확인
  //   const gaOnClick = (name: string) => {
  //     // react-ga
  //     // ReactGA.event({
  //     //   category: 'Community',
  //     //   action: 'Click',
  //     //   label: `Community-${name}`,
  //     // });
  //     window.scrollTo(0, 0);
  //     sessionStorage.removeItem('communityOffset');
  //     sessionStorage.removeItem('openCommunityOffset');
  //     if (name === 'MyCommunity') {
  //       history.replace('/community/main');
  //     }
  //     if (name === 'CommunityList') {
  //       history.replace('/community/main/open-communities');
  //     }
  //     if (name === 'Follow') {
  //       history.replace('/community/main/follow');
  //     }
  //   };

  //   useEffect(() => {
  //     // react-ga (초기 진입 시)
  //     ReactGA.event({
  //       category: 'Community',
  //       action: 'Click',
  //       label: `Community-MyCommunity`,
  //     });
  //   }, []);

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
              active={true}
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
              active={false}
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

      {/* 컨텐츠 영역 */}
      <Segment className="full">
        <OpenCommunityFieldItemsView />
        <OpenCommunityListHeaderView />
        <OpenCommunityListView />
        <NoOpenCommunityView />
      </Segment>
    </div>
  );
}
