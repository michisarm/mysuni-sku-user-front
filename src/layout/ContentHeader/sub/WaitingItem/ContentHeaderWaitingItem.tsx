
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { MyLearningSummaryModal } from 'myTraining';


interface Props {
  onClickRecommend?: () => void;
  year?: number;
}

@reactAutobind
class ContentHeaderWaitingItem extends PureComponent<Props> {
  //
  static defaultProps = {
    onClickRecommend: () => { },
    year: moment().year()
  };

  render() {
    //
    const { onClickRecommend, year } = this.props;

    return (
      <div className="ui statistic total-time">
        <MyLearningSummaryModal
          trigger={(
            <Button className="btn-total-time">
              <Label className="onlytext">
                <Icon className="total-time" /><span>총 학습시간</span>
              </Label>
              <span className="value2">
                <span className="wating">학습대기중</span>
              </span>
              <div onClick={onClickRecommend}>
                <span>추천학습</span>
                <br />
                <span>과정보기</span>
              </div>
            </Button>
          )}
          year={year}
        />

      </div>
    );
  }
}

export default ContentHeaderWaitingItem;
