
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { Button, Label, Icon } from 'semantic-ui-react';


interface Props {
  minute?: number,
  onClick: () => void,
}

@reactAutobind
class ContentHeaderTotalTimeItem extends Component<Props> {
  //
  static defaultProps = {
    minute: 0,
    onClick: () => {},
  };

  render() {
    //
    const { minute, onClick } = this.props;
    let hour = 0;
    let onlyMinute = minute;

    if (minute) {
      hour = Math.floor(minute / 60);
      onlyMinute = minute % 60;
    }

    return (
      <div className="ui statistic total-time">
        <Button className="btn-total-time" onClick={onClick}>
          <Label className="onlytext">
            <Icon className="total-time" /><span>총 학습시간</span>
          </Label>
          <div className="value2">
            <strong>{hour}</strong><span>h</span>
            <strong className="min">{onlyMinute}</strong><span>m</span>
          </div>
        </Button>
      </div>
    );
  }
}

export default ContentHeaderTotalTimeItem;
