import React, { Component, createRef } from 'react';
import {
  Segment,
  Sticky,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CubeRequired from '../CubeRequired';
import ListContents from '../ListContents';
import CommentContents from '../CommentContents';
import OverviewContents from '../OverviewContents';
import CubeEnrollment from '../CubeEnrollment';

interface Props {

}

interface States {
  activeItem : string
}

class ContentsArea extends React.Component<Props, States> {
    contextRef:any = createRef();

    handleItemClick(e:any, { name }:any) {
      this.setState({ activeItem: name });
    }

    render() {
      const { activeItem } = this.state;
      return (
        <div ref={this.contextRef}>
          <Sticky context={this.contextRef} className="tab-menu offset0">
            <div className="cont-inner">
              <Menu className="sku">
                <Menu.Item
                  name="Overview"
                  active={activeItem === 'Overview'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to=""
                >
                                Overview
                </Menu.Item>
                <Menu.Item
                  name="Comment"
                  active={activeItem === 'Comment'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/learning/cube-detail-elearning-comment"
                >
                                Comment <span className="count">+12</span>
                </Menu.Item>
              </Menu>
            </div>
          </Sticky>
          <Segment className="full">
            <div className="ui bottom active tab full segment" data-tab="first">
              {/*우측 sub info*/}
              <CubeEnrollment />

              <OverviewContents />
            </div>

            <div className="ui bottom tab full segment" data-tab="second">
              {/*우측 sub info*/}
              <CubeEnrollment />

              {/*좌측 contents*/}
              <CommentContents />
            </div>
          </Segment>
        </div>
      );
    }
}


export default ContentsArea;
