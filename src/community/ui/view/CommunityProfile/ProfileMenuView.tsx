import React from 'react';
import { Sticky, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getProfileItemMapFromCommunity } from 'community/service/useCommunityProfile/utility/getProfileItemMapFromCommunity';
import { Area } from 'tracker/model';

interface ProfileMenuViewProps {
  menuType: string;
}

const ProfileMenuView: React.FC<ProfileMenuViewProps> = function ProfileMenuView({
  menuType,
}) {
  return (
    <>
      <Sticky className="tab-menu offset0">
        <div className="cont-inner" data-area={Area.COMMUNITY_PROFILEMENU}>
          <Menu className="sku">
            <Menu.Item
              name="Profile"
              active={menuType === 'myProfile'}
              as={Link}
              to="/community/my-profile"
              onClick={getProfileItemMapFromCommunity}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              name="MyCommunity"
              active={menuType === 'communities'}
              as={Link}
              to="/community/my-profile/communities"
              onClick={getProfileItemMapFromCommunity}
            >
              My Community
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
    </>
  );
};

export default ProfileMenuView;