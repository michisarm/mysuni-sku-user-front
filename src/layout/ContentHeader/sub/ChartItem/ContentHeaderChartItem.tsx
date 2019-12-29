
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';


interface Props {
  universityTime: number;
  myCompanyTime: number,
}

@reactAutobind
class ContentHeaderChartItem extends Component<Props> {
  //
  timeToHourMinute(minuteTime: number) {
    //
    let hour = 0;
    let minute = minuteTime;

    if (minuteTime) {
      hour = Math.floor(minuteTime / 60);
      minute = minuteTime % 60;
    }
    return { hour, minute };
  }

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
    const universityHourAndMinute = this.timeToHourMinute(universityTime);
    const myCompanyHourAndMinute = this.timeToHourMinute(myCompanyTime);

    return (
      <div className="chart-wrap">
        <div className="ui pie w56" data-value={this.getChartValue()}>
          <span className="left" />
          <span className="right" />
        </div>
        <div className="ui list">
          <dl className="item sk">
            <dt>SK University</dt>
            <dd>{universityHourAndMinute.hour}h {universityHourAndMinute.minute}m</dd>
          </dl>
          <dl className="item my">
            <dt>My company</dt>
            <dd>{myCompanyHourAndMinute.hour}h {myCompanyHourAndMinute.minute}m</dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default ContentHeaderChartItem;
