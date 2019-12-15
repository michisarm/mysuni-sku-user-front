import React, { Component } from 'react';
import {
  Segment,
  Icon,
} from 'semantic-ui-react';

class TitleArea extends React.Component {
  render() {
    return (
      <div className="main-filter">
        <Segment className="full">
          <div className="ui inline transparent large dropdown"
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


export default TitleArea;
