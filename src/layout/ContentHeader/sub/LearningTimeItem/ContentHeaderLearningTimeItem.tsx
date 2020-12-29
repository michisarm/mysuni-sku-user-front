
import React, { PureComponent } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button, Label, Icon } from 'semantic-ui-react';
import { MyLearningSummaryModal } from 'myTraining';

interface Props {
  minute?: number,
  year?: number,
  accrueMinute?: number,
}


@reactAutobind
class ContentHeaderLearningTimeItem extends PureComponent<Props> {
  //
  static defaultProps = {
    minute: 0,
  };

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

    let accrueHour = 0;
    let onlyAccureMinute = minute;

    if (accrueMinute) {
      accrueHour = Math.floor(accrueMinute / 60);
      onlyAccureMinute = accrueMinute % 60;
    }

    let accrueTotal: any = null;

    if (accrueHour < 1 && onlyAccureMinute! < 1) {
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
    } else if (onlyAccureMinute! < 1) {
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
            trigger={(
              <Button className="btn-total-time">
                <Label className="onlytext">
                  {/*<Icon className="total-time" /><span>총 학습시간</span>*/}
                  <div>
                    <span style={{textDecoration: "none", color: "#ea644d"}}>{year}년</span> <span style={{textDecoration: "none"}}>학습시간</span>
                  </div>
                </Label>
                {total}
                <div style={{marginTop: '5px', textAlign: 'left'}}>
                  <a href="#" className="main_sub_all" style={{color: 'gray'}}>
                    &#40;누적 
                    {accrueTotal}
                    &#41;
                  </a>
                </div>
              </Button>
            )}
            year={year}
          />
        }
      </div>
    );
  }
}

export default ContentHeaderLearningTimeItem;
