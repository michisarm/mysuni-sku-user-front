import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  onClickRecommend?: () => void;
  year?: number;
}

@reactAutobind
class ContentHeaderWaitingItem extends PureComponent<Props> {
  //
  static defaultProps = {
    onClickRecommend: () => {},
    year: moment().year(),
  };

  render() {
    //
    const { onClickRecommend, year } = this.props;

    return (
      <div className="ui statistic total-time">
        {/* <MyLearningSummaryModal
          trigger={
            <Button className="btn-total-time">
              <Label className="onlytext">
                <Icon className="total-time" />
                <span>
                  <PolyglotText
                    id="Certification-View-총학시간"
                    defaultString="총 학습시간"
                  />
                </span>
              </Label>
              <span className="value2" onClick={onClickRecommend}>
                <span className="wating">
                  <PolyglotText
                    id="learning-학보드-학습대기중"
                    defaultString="학습대기중"
                  />
                </span>
              </span>
            </Button>
          }
          year={year}
        /> */}
      </div>
    );
  }
}

export default ContentHeaderWaitingItem;
