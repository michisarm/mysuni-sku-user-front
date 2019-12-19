
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Segment, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react';

import { ChannelModel } from 'college';


interface Props {
  channel: ChannelModel,
}

@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {
  //
  render() {
    //
    const { channel } = this.props;

    return (
      <div className="main-filter">
        <Segment className="full">
          <div
            className="ui inline transparent large dropdown"
            data-add=" 채널의 추천과정"
          >{/* data-addText 선택시 추가될 text // */}
            <div className="text">AI 채널의 추천과정</div>
            <Icon className="dropdown" />
            <div className="menu">
              <div className="item">AI</div>
              <div className="item">Design</div>
              <div className="item">Database</div>
              <div className="item">Project Managing</div>
              <div className="item">Big Data</div>
              <div className="item">AI</div>
              <div className="item">Design</div>
              <div className="item">Database</div>
              <div className="item">Project Managing</div>
              <div className="item">Big Data</div>
            </div>
          </div>
        </Segment>
      </div>
    );
  }
}

export default CategoryLecturesHeaderView;
