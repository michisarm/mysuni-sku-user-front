
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Icon } from 'semantic-ui-react';


interface Props {
  count: number,
}

@reactAutobind
class LineHeaderView extends Component<Props> {
  //
  render() {
    //
    const { count } = this.props;

    return (
      <div className="top-guide-title">
        <div className="list-number">총 <strong>{count}개</strong>의 리스트가 있습니다.</div>
        <Button icon className="left post"><Icon className="filter2" />Filter</Button>
      </div>
    );
  }
}

export default LineHeaderView;
