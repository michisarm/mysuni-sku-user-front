/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import { Link, useHistory } from 'react-router-dom';
import OpenCommunityIntroFieldListContainer from '../logic/OpenCommunityIntro/OpenCommunityIntroFieldListContainer';
import OpenCommunityIntroCommunityListContainer from '../logic/OpenCommunityIntro/OpenCommunityIntroCommunityListContainer';
import ReactGA from 'react-ga';
import { Area } from 'tracker/model';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';

interface OpenCommunityViewProps {}

const OpenCommunityView: React.FC<OpenCommunityViewProps> = function OpenCommunityView() {
  const contextRef = useRef(null);
  const history = useHistory();
  const isExternal = isExternalInstructor();

  const gaOnClick = (name: string) => {
    // react-ga
    ReactGA.event({
      category: 'Community',
      action: 'Click',
      label: `Community-${name}`,
    });
    window.scrollTo(0, 0);
    sessionStorage.removeItem('communityOffset');
    sessionStorage.removeItem('openCommunityOffset');
    if (name === 'MyCommunity') history.replace('/community/main');
    if (name === 'CommunityList') {
      history.replace('/community/main/open-communities');
    }
    if (name === 'Follow') history.replace('/community/main/follow');
    if (name === 'MyFeed') {
      history.replace('/community/main/feed');
    }
    if (name === 'Bookmark') {
      history.replace('/community/main/bookmark');
    }
  };

  useEffect(() => {
    if (isExternal) {
      gaOnClick('MyCommunity');
    }
  }, []);

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner" data-area={Area.COMMUNITY_MENU}>
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={false}
              as={Link}
              onClick={() => gaOnClick('MyCommunity')}
            >
              My Community
              <span className="count" />
            </Menu.Item>
            {!isExternal && (
              <Menu.Item
                name="MyCreatedCommunity"
                active={true}
                as={Link}
                onClick={() => gaOnClick('CommunityList')}
              >
                Community List
              </Menu.Item>
            )}
            <Menu.Item
              name="MyFeed"
              active={false}
              as={Link}
              onClick={() => gaOnClick('MyFeed')}
            >
              My Feed
            </Menu.Item>
            <Menu.Item
              name="Follow"
              active={false}
              as={Link}
              onClick={() => gaOnClick('Follow')}
            >
              Follower Feed
            </Menu.Item>
            <Menu.Item
              name="Bookmark"
              active={false}
              as={Link}
              onClick={() => gaOnClick('Bookmark')}
            >
              Bookmark
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>

      {/* 컨텐츠 영역 */}
      <Segment className="full">
        <OpenCommunityIntroFieldListContainer />
        <OpenCommunityIntroCommunityListContainer />
      </Segment>
    </div>
  );
};

export default OpenCommunityView;
