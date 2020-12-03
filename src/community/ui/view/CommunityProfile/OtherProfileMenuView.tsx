import React, { useEffect, useState } from 'react';
import { Sticky, Menu } from 'semantic-ui-react';
import { Link, useLocation, useParams } from 'react-router-dom';

interface Params {
  profileId: string;
}

const OtherProfileMenuView: React.FC = function OtherProfileMenuView() {
  const { pathname } = useLocation();
  const { profileId } = useParams<Params>();
  const [activeTab, setActiveTab] = useState<string>();

  useEffect(() => {
    if (pathname.indexOf('/feed') > -1) {
      setActiveTab('feed');
      return;
    }
    if (pathname.indexOf('/communities') > -1) {
      setActiveTab('communities');
      return;
    }
    setActiveTab('profile');
  }, [pathname]);

  return (
    <Sticky className="tab-menu offset0">
      <div className="cont-inner">
        <Menu className="sku">
          <Menu.Item
            name="Profile"
            active={activeTab === 'profile'}
            as={Link}
            to={`/community/profile/${profileId}`}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            name="Feed"
            active={activeTab === 'feed'}
            as={Link}
            to={`/community/profile/${profileId}/feed`}
          >
            Feed
          </Menu.Item>
          <Menu.Item
            name="MyCommunity"
            active={activeTab === 'communities'}
            as={Link}
            to={`/community/profile/${profileId}/communities`}
          >
            Community
          </Menu.Item>
        </Menu>
      </div>
    </Sticky>
  );
};

export default OtherProfileMenuView;
