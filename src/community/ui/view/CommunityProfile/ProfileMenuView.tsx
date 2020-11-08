import React from "react";
import { Sticky, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";


interface ProfileMenuViewProps {
  menuType: string;
}

const ProfileMenuView: React.FC<ProfileMenuViewProps> = function ProfileMenuView({
  menuType
}) {

  

  return (
    <>
      <Sticky className="tab-menu offset0">
        <div className="cont-inner">
          <Menu className="sku">
            <Menu.Item
              name="Profile"
              active={menuType==='myProfile'}
              //onClick={this.handleItemClick}
              as={Link}
              to=""
            >
              Profile
            </Menu.Item>
            <Menu.Item
              name="Feed"
              active={menuType==='feed'}
              //onClick={this.handleItemClick}
              as={Link}
              to=""
            >
              Feed
            </Menu.Item>
            <Menu.Item
              name="MyCommunity"
              active={menuType==='communities'}
              //onClick={this.handleItemClick}
              as={Link}
              to=""
            >
              My Community
            </Menu.Item>
            <Menu.Item
              name="bookmark"
              active={menuType==='bookmark'}
              //onClick={this.handleItemClick}
              as={Link}
              to=""
            >
              북마크
            </Menu.Item>
          </Menu>
        </div>
      </Sticky>
    </>
  );
}

export default ProfileMenuView;
