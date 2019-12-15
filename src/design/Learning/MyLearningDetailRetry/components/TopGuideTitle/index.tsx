import React, { Component, createRef } from 'react';
import {
  Icon, Button,
} from 'semantic-ui-react';

class TopGuideTitle extends React.Component {
  render() {
    return (
      <div className="top-guide-title">
        <div className="list-number">총 <strong>24개</strong>의 리스트가 있습니다.</div>
        <Button icon className="left post"><Icon className="filter2" />Filter</Button>
      </div>
    );
  }
}

export default TopGuideTitle;
