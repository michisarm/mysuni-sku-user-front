
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button, Icon } from 'semantic-ui-react';
import { ContentHeader } from 'shared';
import { MyLearningSummaryModal, MyLearningSummaryService } from 'mypage';
import { HeaderWrapperView, ItemWrapper, LearningTimeView, HeaderItemView } from './MyLearningSummaryElementsView';


interface Props extends RouteComponentProps {
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
    //
    this.init();
  }

  init() {
    //
    const { myLearningSummaryService } = this.props;

    myLearningSummaryService!.findMyLearningSummary();
  }

  getHourMinute(minuteTime: number) {
    //
    let hour = 0;
    let minute = minuteTime;

    if (minuteTime) {
      hour = Math.floor(minuteTime / 60);
      minute = minuteTime % 60;
    }
    return { hour, minute };
  }

  onClickComplete() {
    //
    this.props.history.push('/mypage/CompletedList');
  }

  onClickStamp() {
    //
    this.props.history.push('/mypage/EarnedStampList');
  }

  render() {
    //
    const { myLearningSummaryService } = this.props;
    const { myLearningSummary } = myLearningSummaryService!;
    const { hour, minute } = this.getHourMinute(myLearningSummary.totalLearningTime);

    return (
      <HeaderWrapperView>

        <ItemWrapper>
          <span className="text01">My Learning</span>
          <Button
            icon
            className="right btn-black"
            onClick={() => this.props.history.push('/my-training')}
          >
            View all
            <Icon className="morelink" />
          </Button>
        </ItemWrapper>

        <ItemWrapper>
          <MyLearningSummaryModal
            trigger={(
              <LearningTimeView
                icon="time"
                label="총 학습시간"
                hour={hour}
                minute={minute}
              />
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
          <HeaderItemView
            icon="complete"
            label="완료된 학습"
            count={myLearningSummary.completeLectureCount}
            onClick={this.onClickComplete}
          />
        </ItemWrapper>

        <ItemWrapper>
          <HeaderItemView
            icon="stamp"
            label="획득 Stamp"
            count={myLearningSummary.acheiveStampCount}
            onClick={this.onClickStamp}
          />
        </ItemWrapper>

      </HeaderWrapperView>
    );
  }
}

export default withRouter(MyLearningSummaryContainer);
