
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Icon, Label } from 'semantic-ui-react';
import { timeToHourMinute, timeToHourMinutePaddingFormat } from 'shared/helper/dateTimeHelper';
import { ActionLogService } from 'shared/stores';
import MyLearningSummaryModal from '../logic/MyLearningSummaryModal';


interface Props {
  actionLogService?: ActionLogService
  year: number
  totalLearningTime: number
  mySuniLearningTime: number
  myCompanyLearningTime: number
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
))
@observer
@reactAutobind
class ContentHeaderLearningSummaryView extends Component<Props> {
  //
  getTotalTimeNode() {
    //
    const { totalLearningTime } = this.props;
    const { hour, minute } = timeToHourMinute(totalLearningTime);
    let node;

    if (hour < 1 && minute < 1) {
      node = (
        <>
          <strong>00</strong><span>h</span> <strong>00</strong><span>m</span>
        </>
      );
    }
    else if (hour < 1) {
      node = (
        <>
          <strong>{minute}</strong><span>m</span>
        </>
      );
    }
    else if (minute < 1) {
      node = (
        <>
          <strong>{hour}</strong><span>h</span>
        </>
      );
    }
    else {
      node = (
        <>
          <strong>{hour}</strong><span>h</span> <strong>{minute}</strong><span>m</span>
        </>
      );
    }

    return <div className="value2">{node}</div>;
  }

  getChartValue() {
    //
    const { mySuniLearningTime, myCompanyLearningTime } = this.props;

    if (!(mySuniLearningTime + myCompanyLearningTime)) {
      return 0;
    }
    return Math.floor(mySuniLearningTime / (mySuniLearningTime + myCompanyLearningTime) * 360);
  }

  getModalTrigger() {
    //
    return (
      <Button className="btn-total-time" onClick={this.onClickActionLog}>
        <Label className="onlytext">
          <Icon className="total-time" /><span>총 학습시간</span>
        </Label>
        {this.getTotalTimeNode()}
      </Button>
    );
  }

  onClickActionLog() {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: '총 학습시간' });
  }

  render() {
    //
    const { year, mySuniLearningTime, myCompanyLearningTime } = this.props;

    return (
      <>
        <div className="ui statistic total-time">
          <MyLearningSummaryModal
            trigger={this.getModalTrigger()}
            year={year}
          />
        </div>

        <div className="chart-wrap">
          <div className="ui pie w56" data-value={this.getChartValue()}>
            <span className="left" />
            <span className="right" />
          </div>
          <div className="ui list">
            <dl className="item sk">
              <dt>mySUNI</dt>
              <dd>{timeToHourMinutePaddingFormat(mySuniLearningTime)}</dd>
            </dl>
            <dl className="item my">
              <dt>My company</dt>
              <dd>{timeToHourMinutePaddingFormat(myCompanyLearningTime)}</dd>
            </dl>
          </div>
        </div>
      </>
    );
  }
}

export default ContentHeaderLearningSummaryView;
