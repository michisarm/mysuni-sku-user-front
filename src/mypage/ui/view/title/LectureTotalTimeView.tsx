import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { timeToHourMinute, timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import MyLearningSummaryModal from '../../../ui/logic/MyLearningSummaryModal';

interface Props {
  year: number
  totalLearningTime: number
  suniLearningTime: number
  myCompanyLearningTime: number
}

@observer
@reactAutobind
class LectureTotalTimeView extends Component<Props> {
  //

  getChartValue() {
    //
    const { suniLearningTime, myCompanyLearningTime } = this.props;

    if (!(suniLearningTime + myCompanyLearningTime)) {
      return 0;
    }
    return  Math.floor(suniLearningTime / (suniLearningTime + myCompanyLearningTime) * 360);
  }

  render() {
    //
    const { year, totalLearningTime, suniLearningTime, myCompanyLearningTime } = this.props;
    const { hour, minute } = timeToHourMinute(totalLearningTime);
    let total:any = null;

    if (hour < 1 && minute < 1) {
      total = (
        <div className="value2">
          <strong>00</strong><span>h</span> <strong>00</strong><span>m</span>
        </div>
      );
    }
    else if (hour < 1) {
      total = (
        <div className="value2">
          <strong>{minute}</strong><span>m</span>
        </div>
      );
    }
    else if (minute < 1) {
      total = (
        <div className="value2">
          <strong>{hour}</strong><span>h</span>
        </div>
      );
    }
    else {
      total = (
        <div className="value2">
          <strong>{hour}</strong><span>h</span> <strong>{minute}</strong><span>m</span>
        </div>
      );
    }

    return (
      <div className="cell">
        <div className="cell-inner">

          <div className="ui statistic total-time">
            {
              <MyLearningSummaryModal
                trigger={(
                  <Button className="btn-total-time">
                    <Label className="onlytext">
                      <Icon className="total-time" /><span>총 학습시간</span>
                    </Label>
                    {total}
                  </Button>
                )}
                year={year}
              />
            }
          </div>

          <div className="chart-wrap">
            <div className="ui pie w56" data-value={this.getChartValue()}>
              <span className="left" />
              <span className="right" />
            </div>
            <div className="ui list">
              <dl className="item sk">
                <dt>mySUNI</dt>
                <dd>{timeToHourMinutePaddingFormat(suniLearningTime)}</dd>
              </dl>
              <dl className="item my">
                <dt>My company</dt>
                <dd>{timeToHourMinutePaddingFormat(myCompanyLearningTime)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LectureTotalTimeView;
