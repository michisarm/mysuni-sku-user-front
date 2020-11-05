import React, { Component, createRef } from "react";
import { Segment, Sticky, Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import CommunityProfileItem from "community/viewModel/CommunityProfile";


interface ContentsProfileViewProps {
  profileItem: CommunityProfileItem;
}

const ContentsProfileView: React.FC<ContentsProfileViewProps> = function ContentsProfileView({
  profileItem
}) {

  //contextRef = createRef();
  //state = { activeItem: "Profile" };

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  //const { activeItem } = this.state;
  return (
    <>
      {/*<div ref=this.contextRef>*/}
      <div>
        {/*<Sticky context={this.contextRef} className="tab-menu offset0">*/}
        <Sticky className="tab-menu offset0">
          <div className="cont-inner">
            <Menu className="sku">
              <Menu.Item
                name="Profile"
                active={true}
                //onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                Profile
              </Menu.Item>
              <Menu.Item
                name="Feed"
                active={false}
                //onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                Feed
              </Menu.Item>
              <Menu.Item
                name="MyCommunity"
                active={false}
                //onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                My Community
              </Menu.Item>
              <Menu.Item
                name="북마크"
                active={false}
                //onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                북마크
              </Menu.Item>
            </Menu>
          </div>
        </Sticky>

        <Segment className="full">
          <div className="course-detail-center community-containter">
            <div className="community-main-contants">
            <table className="ui fixed table vertical celled">
              <tbody>
              <tr>
                <th scope="row" className="three wide">이름</th>
                <td>{profileItem.name}</td>
              </tr>
              <tr>
                <th scope="row">관계사</th>
                <td>{profileItem.company.name}</td>
              </tr>
              <tr>
                <th scope="row">닉네임</th>
                <td>{profileItem.nickname}</td>
              </tr>
              <tr>
                <th scope="row">취미</th>
                <td>{profileItem.hobby}</td>
              </tr>
              </tbody>
            </table>
            </div>
          </div>
        </Segment>
      </div>
    </>
  );
}

export default ContentsProfileView;
