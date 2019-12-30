
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Label, Icon } from 'semantic-ui-react';
import { MyLearningSummaryModal } from 'mytraining/index';


interface Props {
  minute?: number,
}

@reactAutobind
class ContentHeaderTotalTimeItem extends Component<Props> {
  //
  static defaultProps = {
    minute: 0,
  };

  render() {
    //
    const { minute } = this.props;
    let hour = 0;
    let onlyMinute = minute;

    if (minute) {
      hour = Math.floor(minute / 60);
      onlyMinute = minute % 60;
    }

    return (
      <div className="ui statistic total-time">
        {
          <MyLearningSummaryModal
            trigger={(
              <Button className="btn-total-time">
                <Label className="onlytext">
                  <Icon className="total-time" /><span>총 학습시간</span>
                </Label>
                <div className="value2">
                  <strong>{hour || '00'}</strong><span>h</span>
                  <strong className="min">{onlyMinute || '00'}</strong><span>m</span>
                </div>
              </Button>
            )}
          />
        }
      </div>
    );
  }
}

export default ContentHeaderTotalTimeItem;
