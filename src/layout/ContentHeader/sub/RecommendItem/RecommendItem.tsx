
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  totalChannelCount: number,
  favoriteChannelCount: number,
  top: React.ReactNode,
}

@reactAutobind
class RecommendItem extends Component<Props> {
  //
  render() {
    //
    const { top, favoriteChannelCount, totalChannelCount } = this.props;

    return (
      <div className="recommend-info">
        {top}

        <span className="value1">
          <span className="text01">{favoriteChannelCount}</span>
          <span className="text02">/</span>
          <span className="text03">{totalChannelCount}</span>
          <span className="text04">개</span>
        </span>
      </div>
    );
  }
}

export default RecommendItem;
