
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Label, Icon } from 'semantic-ui-react';


interface Props {
  joinedCount: number,
  myCount: number,
}

@reactAutobind
class CommunityItem extends Component<Props> {
  //
  render() {
    //
    const { joinedCount, myCount } = this.props;

    return (
      <>
        <div className="ui statistic community-num">
          <Label className="onlytext">
            <Icon className="commu-info16" /><span>가입한 커뮤니티</span>
          </Label>
          <div className="value2">
            <strong>{joinedCount}</strong><span>개</span>
          </div>
        </div>
        <div className="ui statistic community-num">
          <Label className="onlytext">
            <Icon className="commu-info16-2" /><span>내가 만든 커뮤니티</span>
          </Label>
          <div className="value2">
            <strong>{myCount}</strong><span>개</span>
          </div>
        </div>
      </>
    );
  }
}

export default CommunityItem;
