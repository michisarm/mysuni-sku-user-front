import React, { Component, createRef } from 'react';
import {
  Segment,
  Sticky,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CardListGroup from '../CardListGroup';
import ContentsMoreView from '../ContentsMoreView';
import TopGuideTitle from '../TopGuideTitle';


interface States {
  activeItem: string
}

interface Props {

}

class ContentsArea extends React.Component<Props, States> {
  contextRef : any= createRef();

  constructor(props: Props) {
    super(props);
    this.state = {
      activeItem: 'Enrolled',
    };
  }

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
                name="InProgress"
                active={activeItem === 'InProgress'}
                onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                In progress
              </Menu.Item>
              <Menu.Item
                name="InMyList"
                active={activeItem === 'InMyList'}
                onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                In my list<span className="count">+24</span>
              </Menu.Item>
              <Menu.Item
                name="Enrolled"
                active={activeItem === 'Enrolled'}
                onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                Enrolled<span className="count">+120</span>
              </Menu.Item>
              <Menu.Item
                name="Required"
                active={activeItem === 'Required'}
                onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                Required<span className="count">+12</span>
              </Menu.Item>
              <Menu.Item
                name="Completed"
                active={activeItem === 'Completed'}
                onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                Completed <span className="count">+2</span>
              </Menu.Item>
              <Menu.Item
                name="Retry"
                active={activeItem === 'Retry'}
                onClick={this.handleItemClick}
                as={Link}
                to=""
              >
                Retry <span className="count" />
              </Menu.Item>
            </Menu>
          </div>
        </Sticky>
        <Segment className="full">
          <TopGuideTitle />

          {/* card list */}
          <CardListGroup />

          <ContentsMoreView />
        </Segment>
      </div>
    );
  }
}


export default ContentsArea;
