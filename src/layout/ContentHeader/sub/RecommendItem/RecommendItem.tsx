
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';


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
      <div className="recommend-info personal-channel-header">
        {top}

        <span className="value1">
          <span className="text01">{favoriteChannelCount}</span>
          {/* <span className="text02">/</span>
          <span className="text03">{totalChannelCount}</span> */}
          <span className="text04">
            <PolyglotText defaultString="개" id="rcmd-mifa-관심개수" />
          </span>
        </span>
      </div>
    );
  }
}

export default RecommendItem;
