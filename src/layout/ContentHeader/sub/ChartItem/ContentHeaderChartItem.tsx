
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';

interface Props {
  universityTime: number;
  myCompanyTime: number,
}

@reactAutobind
class ContentHeaderChartItem extends Component<Props> {
  //
  getChartValue() {
    //
    const { universityTime, myCompanyTime } = this.props;

    if (!(universityTime + myCompanyTime)) {
      return 0;
    }
    return  Math.floor(universityTime / (universityTime + myCompanyTime) * 360);
  }

  render() {
    //
    const { universityTime, myCompanyTime } = this.props;

    return (
      <div className="chart-wrap">
        <div className="ui pie w56" data-value={this.getChartValue()}>
          <span className="left" />
          <span className="right" />
        </div>
        <div className="ui list">
          <dl className="item sk">
            <dt>mySUNI</dt>
            <dd>{timeToHourMinutePaddingFormat(universityTime)}</dd>
          </dl>
          <dl className="item my">
            <dt>My company</dt>
            <dd>{timeToHourMinutePaddingFormat(myCompanyTime)}</dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default ContentHeaderChartItem;
