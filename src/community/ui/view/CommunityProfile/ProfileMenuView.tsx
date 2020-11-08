import React from 'react';
import { Sticky, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface ProfileMenuViewProps {
  menuType: string;
}

const ProfileMenuView: React.FC<ProfileMenuViewProps> = function ProfileMenuView({
  menuType,
}) {
  return (
    <>
      <Sticky className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="Profile"
              active={menuType === 'myProfile'}
              as={Link}
              to="/community/my-profile"
            >
              Profile
            </Menu.Item>
            <Menu.Item
              name="Feed"
              active={menuType === 'feed'}
              as={Link}
              to="/community/my-profile/feed"
            >
              Feed
            </Menu.Item>
            <Menu.Item
              name="MyCommunity"
              active={menuType === 'communities'}
              as={Link}
              to="/community/my-profile/communities"
            >
              My Community
            </Menu.Item>
            <Menu.Item
              name="bookmark"
              active={menuType === 'bookmark'}
              as={Link}
              to="/community/my-profile/bookmark"
            >
              북마크
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
    </>
  );
};

export default ProfileMenuView;
