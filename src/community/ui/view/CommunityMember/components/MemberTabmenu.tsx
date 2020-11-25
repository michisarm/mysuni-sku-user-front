import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";


interface Props {
  activemenu: string,
  handleActiveMenu: (active:string, get:any) => void;
}

const MemberTabmenu:React.FC<Props> = ({activemenu, handleActiveMenu}) => {
 
  return (
    <div className="contents-tab-menu">
      <Menu className="sku">
        <Menu.Item
          name="Member"
          active={activemenu === "member"}
          onClick={() => handleActiveMenu("member", "COMMUNITY-f")}
        >
          Member
        </Menu.Item>
        <Menu.Item
          name="Groups"
          active={activemenu === "groups"}
          onClick={() => handleActiveMenu("groups","COMMUNITY-e")}
        >
          Groups
        </Menu.Item>
        <Menu.Item
          name="Approval"
          active={activemenu === "approve"}
          onClick={() => handleActiveMenu("approve", "COMMUNITY-f")}
        >
          가입대기<span className="count">+ 12</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default MemberTabmenu;