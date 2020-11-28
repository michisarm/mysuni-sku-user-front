import React, { useRef, useState } from 'react';
import Sticky from 'semantic-ui-react/dist/commonjs/modules/Sticky';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import { Link } from 'react-router-dom';

import CommunityFollowListContainer from '../logic/CommunityFollow/CommunityFollowListContainer';
import CommunityFollowPostListContainer from '../logic/CommunityFollow/CommunityFollowPostListContainer';

import FollowModal from '../view/CommunityFollowModal/FollowModalView';


const FollowView: React.FC = function FollowView() {
  const contextRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef} className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="MyCommunity"
              active={false}
              as={Link}
              to="/community/main"
            >
              My Community
              <span className="count" />
            </Menu.Item>
            <Menu.Item
              name="MyCreatedCommunity"
              active={false}
              as={Link}
              to="/community/main/open-communities"
            >
              Open Community
            </Menu.Item>
            <Menu.Item
              name="MyFeed"
              active={true}
              as={Link}
              to="/community/main/follow"
            >
              Follow
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
      <Segment className="full">
        <div className="course-detail-center community-containter">
          <CommunityFollowPostListContainer />
          <CommunityFollowListContainer />
        </div>
      </Segment>    
      <FollowModal open={open} />
    </div>
  );
};

export default FollowView;