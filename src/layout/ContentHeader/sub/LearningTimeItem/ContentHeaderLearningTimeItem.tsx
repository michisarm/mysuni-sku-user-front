import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { MyLearningSummaryModal } from 'myTraining';
import React, { PureComponent } from 'react';
import { Button, Label } from 'semantic-ui-react';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';

interface Props {
  minute?: number;
  year?: number;
  accrueMinute?: number;
}

@reactAutobind
@observer
class ContentHeaderLearningTimeItem extends PureComponent<Props> {
  //

  render() {
    //
    const { minute, year, accrueMinute } = this.props;
    let hour = 0;
    let onlyMinute = minute;

    if (minute) {
      hour = Math.floor(minute / 60);
      onlyMinute = minute % 60;
    }

    let total: any = null;

    if (hour < 1 && onlyMinute !== undefined && onlyMinute < 1) {
      total = (
        <div className="value2">
          <strong>00</strong>
          <span>h</span> <strong>00</strong>
          <span>m</span>
        </div>
      );
    } else if (hour < 1) {
      total = (
        <div className="value2">
          <strong>{onlyMinute}</strong>
          <span>m</span>
        </div>
      );
    } else if (onlyMinute !== undefined && onlyMinute < 1) {
      total = (
        <div className="value2">
          <strong>{hour}</strong>
          <span>h</span>
        </div>
      );
    } else {
      total = (
        <div className="value2">
          <strong>{hour}</strong>
          <span>h</span> <strong>{onlyMinute}</strong>
          <span>m</span>
        </div>
      );
    }

    let accrueHour = 0;
    let onlyAccureMinute = minute;

    if (accrueMinute) {
      accrueHour = Math.floor(accrueMinute / 60);
      onlyAccureMinute = accrueMinute % 60;
    }

    let accrueTotal: any = null;

    if (
      accrueHour < 1 &&
      onlyAccureMinute !== undefined &&
      onlyAccureMinute < 1
    ) {
      accrueTotal = (
        <>
          <span className="big2">00</span>
          <span className="small2">h</span> <span className="big">00</span>
          <span className="small2">m</span>
        </>
      );
    } else if (accrueHour < 1) {
      accrueTotal = (
        <>
          <span className="big2">{accrueMinute}</span>
          <span className="small2">m</span>
        </>
      );
    } else if (onlyAccureMinute !== undefined && onlyAccureMinute < 1) {
      accrueTotal = (
        <>
          <span className="big2">{accrueHour}</span>
          <span className="small2">h</span>
        </>
      );
    } else {
      accrueTotal = (
        <>
          <span className="big2">{accrueHour}</span>
          <span className="small2">h</span>{' '}
          <span className="big2">{onlyAccureMinute}</span>
          <span className="small2">m</span>
        </>
      );
    }

    return (
      <div className="ui statistic total-time">
        {
          <MyLearningSummaryModal
            trigger={
              <Button
                className="btn-total-time"
                style={{ paddingLeft: '100px' }}
              >
                <Label className="onlytext">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        `<strong>{year}년</strong>학습시간`,
                        'mapg-mifa-년도',
                        {
                          year: (year || 0).toString(),
                        }
                      ),
                    }}
                  />
                </Label>
                {total}
              </Button>
            }
            year={year}
          />
        }
      </div>
    );
  }
}

export default ContentHeaderLearningTimeItem;
