
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Label, Icon } from 'semantic-ui-react';


interface Props {
  totalChannelCount: number,
  favoriteChannelCount: number,
}

@reactAutobind
class RecommendItem extends Component<Props> {
  //
  render() {
    //
    const { favoriteChannelCount } = this.props;

    return (
      <div className="recommend-info">
        <Label className="onlytext">
          <Icon className="channel16" /><span>관심 Channel</span>
        </Label>
        <span className="value1">
          <span className="text01">{favoriteChannelCount}</span>
          {/*<span className="text02">/</span>*/}
          {/*<span className="text03">{totalChannelCount}</span>*/}
          <span className="text04">개</span>
        </span>
      </div>
    );
  }
}

export default RecommendItem;
