
import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { reactAutobind } from '@nara.platform/accent';

import { Segment, Button, Icon } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { MyLearningSummaryModal, MyLearningSummaryService } from 'mypage';
import { ContentHeader, mobxHelper } from 'shared';

interface Props extends RouteComponentProps{
  myLearningSummaryService?: MyLearningSummaryService
}

@inject(mobxHelper.injectFrom(
  'myTraining.myLearningSummaryService',
))
@observer
@reactAutobind
class MyLearningSummaryContainer extends Component<Props> {
  //
  componentDidMount(): void {
    this.init();
  }

  init() {
    const { myLearningSummaryService } = this.props;

    myLearningSummaryService!.findMyLearningSummary();
  }

  timeToHourMinute(minuteTime: number) {
    //
    let hour = 0;
    let minute = minuteTime;

    if (minuteTime) {
      hour = Math.floor(minuteTime / 60);
      minute = minuteTime % 60;
    }
    return { hour, minute };
  }

  render() {
    //
    const { myLearningSummaryService } = this.props;
    const { myLearningSummary } = myLearningSummaryService!;

    const minute = myLearningSummary.totalLearningTime;
    let hour = 0;
    let onlyMinute = minute;

    if (minute) {
      hour = Math.floor(minute / 60);
      onlyMinute = minute % 60;
    }

    return (
      <div className="my-learning-area">
        <Segment className="full">
          <div className="table-css type1">{/* .type1, .type2 //*/}
            <div className="row">
              <div className="cell v-middle">
                <div className="cell-inner">
                  <span className="text01">My Learning</span>
                  <Button
                    icon
                    className="right btn-black"
                    onClick={() => this.props.history.push('/my-training')}
                  >
                    View all
                    <Icon className="morelink" />
                  </Button>
                </div>
              </div>

              <ItemWrapper>
                <MyLearningSummaryModal
                  trigger={(
                    <Button className="btn-complex48">
                      <span className="i">
                        <Icon className="time48" />
                        <span className="blind">total time</span>
                      </span>
                      <span className="t">
                        <span className="underline">총 학습시간</span>
                        <span className="div">
                          <span className="t1">{hour || '00'}</span><span className="t2">h</span>
                          <span className="t1">{onlyMinute || '00'}</span><span className="t2">m</span>
                        </span>
                      </span>
                    </Button>
                  )}
                />
              </ItemWrapper>

              <ItemWrapper>
                <ContentHeader.ChartItem
                  universityTime={myLearningSummary.suniLearningTime || 0}
                  myCompanyTime={myLearningSummary.myCompanyLearningTime || 0}
                />
              </ItemWrapper>

              <ItemWrapper>
                <Button className="btn-complex48" onClick={() => this.props.history.push('/mypage/CompletedList')}>
                  <span className="i">
                    <Icon className="complete48" />
                    <span className="blind">complete edu</span>
                  </span>
                  <span className="t">
                    <span className="underline">완료한 학습</span>
                    <span className="div">
                      <span className="t1">{myLearningSummary.completeLectureCount || 0}</span><span className="t3">개</span>
                    </span>
                  </span>
                </Button>
              </ItemWrapper>

              <ItemWrapper>
                <Button className="btn-complex48" onClick={() => this.props.history.push('/mypage/EarnedStampList')}>
                  <span className="i">
                    <Icon className="stamp48"><span className="blind">stamp</span></Icon>
                  </span>
                  <span className="t">
                    <span className="underline">획득 Stamp</span>
                    <span className="div">
                      <span className="t1">{myLearningSummary.acheiveStampCount || 0}</span><span className="t3">개</span>
                    </span>
                  </span>
                </Button>
              </ItemWrapper>

            </div>
          </div>
        </Segment>
      </div>
    );
  }
}


class ItemWrapper extends Component {
  //
  render() {
    //
    const { children } = this.props;

    return (
      <div className="cell v-middle">
        <div className="cell-inner">
          {children}
        </div>
      </div>
    );
  }
}

export default withRouter(MyLearningSummaryContainer);
