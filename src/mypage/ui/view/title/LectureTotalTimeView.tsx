import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { timeToHourMinute } from 'shared/helper/dateTimeHelper';

interface Props {
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
    const { totalLearningTime, suniLearningTime, myCompanyLearningTime } = this.props;
    const { hour, minute } = timeToHourMinute(totalLearningTime);
    const { hour: suniHour, minute: suniMinute } = timeToHourMinute(suniLearningTime);
    const { hour: compHour, minute: compMinute } = timeToHourMinute(myCompanyLearningTime);

    return (
      <div className="cell">
        <div className="cell-inner">
          <div className="ui statistic total-time">
            <Button className="btn-total-time">
              <Label className="onlytext">
                <Icon className="total-time" /><span>총 학습시간</span> {/* MyTraining service 구현후 적용*/}
              </Label>
              <div className="value2">
                <strong>{hour || '00'}</strong><span>h</span>
                <strong className="min">{minute || '00'}</strong><span>m</span>
              </div>
            </Button>
          </div>

          <div className="chart-wrap">
            <div className="ui pie w56" data-value={this.getChartValue}>
              <span className="left" />
              <span className="right" />
            </div>
            <div className="ui list">
              <dl className="item sk">
                <dt>SUNI</dt>
                <dd>{suniHour || '00'}h {suniMinute || '00'}m</dd>
              </dl>
              <dl className="item my">
                <dt>My company</dt>
                <dd>{compHour || '00'}h {compMinute || '00'}m</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LectureTotalTimeView;
