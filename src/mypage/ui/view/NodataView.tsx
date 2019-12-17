import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon, Segment } from 'semantic-ui-react';

@reactAutobind
class NodataView extends Component {
  render() {
    return (
      <Segment className="full">
        <div className="top-guide-title">
          <div className="list-number">총 <strong>0개</strong>의 리스트가 있습니다.</div>
          <Button icon className="left post"><Icon className="filter2" />Filter</Button>
        </div>

        <div className="no-cont-wrap">
          <Icon className="no-contents80" />
          <span className="blind">콘텐츠 없음</span>
          <div className="text">
            Completed List에 해당하는<br />
            학습과정이 없습니다. {/*message 로 변경 재사용  --  획득한 Stamp가 없습니다.*/}
          </div>
        </div>
      </Segment>
    );
  }
}

export default NodataView;
