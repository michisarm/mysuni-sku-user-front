import React, { useRef, useEffect } from 'react';
import Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import { Link, useHistory } from 'react-router-dom';
import OpenCommunityIntroFieldListContainer from '../logic/OpenCommunityIntro/OpenCommunityIntroFieldListContainer';
import OpenCommunityIntroCommunityListContainer from '../logic/OpenCommunityIntro/OpenCommunityIntroCommunityListContainer';

import ReactGA from 'react-ga';

interface OpenCommunityViewProps { }

const OpenCommunityView: React.FC<OpenCommunityViewProps> = function OpenCommunityView() {
  const contextRef = useRef(null);
  const history = useHistory();
  const gaOnClick = (name: string) => {
    // react-ga 
    ReactGA.event({
      category: 'Community',
      action: 'Click',
      label: `Community-${name}`,
    });
    window.scrollTo(0, 0);
    sessionStorage.removeItem('communityOffset');
    if (name === 'MyCommunity') history.replace('/community/main');
    if (name === 'CommunityList') history.replace('/community/main/open-communities');
    if (name === 'Follow') history.replace('/community/main/follow');
  }
  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={false}
              as={Link}
              // to="/community/main"
              onClick={() => gaOnClick('MyCommunity')}
            >
              My Community
                <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="MyCreatedCommunity"
              active={true}
              as={Link}
              // to="/community/main/open-communities"
              onClick={() => gaOnClick('CommunityList')}
            >
              Community List
            </Menu.Item>
            <Menu.Item
              name="MyFeed"
              active={false}
              as={Link}
              // to="/community/main/follow"
              onClick={() => gaOnClick('Follow')}
            >
              Follow
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
