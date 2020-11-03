
import React, { PureComponent } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject } from 'mobx-react';

import { Button, Label, Icon } from 'semantic-ui-react';
import { ActionLogService } from 'shared/stores';
import { MyLearningSummaryModal } from 'myTraining';


interface Props {
  actionLogService?: ActionLogService,
  minute?: number,
}

@inject(mobxHelper.injectFrom(
  'shared.actionLogService',
))
@reactAutobind
class ContentHeaderTotalTimeItem extends PureComponent<Props> {
  //
  static defaultProps = {
    minute: 0,
  };

  onClickActionLog() {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: '총 학습시간' });
  }

  render() {
    //
    const { minute } = this.props;
    let hour = 0;
    let onlyMinute = minute;

    if (minute) {
      hour = Math.floor(minute / 60);
      onlyMinute = minute % 60;
    }

    let total: any = null;

    if (hour < 1 && onlyMinute! < 1) {
      total = (
        <div className="value2">
          <strong>00</strong><span>h</span> <strong>00</strong><span>m</span>
        </div>
      );
    }
    else if (hour < 1) {
      total = (
        <div className="value2">
          <strong>{onlyMinute}</strong><span>m</span>
        </div>
      );
    }
    else if (onlyMinute! < 1) {
      total = (
        <div className="value2">
          <strong>{hour}</strong><span>h</span>
        </div>
      );
    }
    else {
      total = (
        <div className="value2">
          <strong>{hour}</strong><span>h</span> <strong>{onlyMinute}</strong><span>m</span>
        </div>
      );
    }

    return (
      <div className="ui statistic total-time">
        {
          <MyLearningSummaryModal
            trigger={(
              <Button className="btn-total-time" onClick={this.onClickActionLog}>
                <Label className="onlytext">
                  <Icon className="total-time" /><span>총 학습시간</span>
                </Label>
                {total}
              </Button>
            )}
          />
        }
      </div>
    );
  }
}

export default ContentHeaderTotalTimeItem;
