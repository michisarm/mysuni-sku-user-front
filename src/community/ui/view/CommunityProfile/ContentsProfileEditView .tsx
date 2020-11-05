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
    </>
  );
}

export default ContentsProfileView;
