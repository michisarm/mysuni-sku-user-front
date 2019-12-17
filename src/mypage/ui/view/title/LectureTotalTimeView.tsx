import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';

@observer
@reactAutobind
class LectureTotalTimeView extends Component {
  render() {
    return (
      <div className="cell">
        <div className="cell-inner">
          <div className="ui statistic total-time">
            <Button className="btn-total-time">
              <Label className="onlytext">
                <Icon className="total-time" /><span>총 학습시간</span> {/* MyTraining service 구현후 적용*/}
              </Label>
              <div className="value2">
                <strong>120</strong><span>h</span>
                <strong className="min">00</strong><span>m</span>
              </div>
            </Button>
          </div>

          <div className="chart-wrap">
            <div className="ui pie w56" data-value="150">
              <span className="left" />
              <span className="right" />
            </div>
            <div className="ui list">
              <dl className="item sk">
                <dt>SUNI</dt>
                <dd>14h 50m</dd>
              </dl>
              <dl className="item my">
                <dt>My company</dt>
                <dd>35h 30m</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LectureTotalTimeView;
