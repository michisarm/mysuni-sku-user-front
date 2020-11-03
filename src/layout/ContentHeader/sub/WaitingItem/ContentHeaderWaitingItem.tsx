
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Label, Icon } from 'semantic-ui-react';


interface Props {
  onClick?: () => void,
}

@reactAutobind
class ContentHeaderWaitingItem extends PureComponent<Props> {
  //
  static defaultProps = {
    onClick: () => { },
  };

  render() {
    //
    const { onClick } = this.props;

    return (
      <div className="ui statistic total-time" onClick={onClick}>
        <Button className="btn-total-time">
          <Label className="onlytext">
            <Icon className="total-time" />
            <span>총 학습시간</span>
          </Label>
          <span className="value2">
            <span className="wating">학습대기중</span>
          </span>
        </Button>

      </div>
    );
  }
}

export default ContentHeaderWaitingItem;
