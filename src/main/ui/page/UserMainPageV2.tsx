import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import { ActionEventService } from 'shared/stores';
import MyLearningSummary from '../../sub/MyLearningSummaryV2';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';
import MyTrainingService from '../../../myTraining/present/logic/MyTrainingService';

interface Props {
  actionEventService: ActionEventService;
  myTrainingService?: MyTrainingService;
}

@inject(
  mobxHelper.injectFrom(
    'shared.actionEventService',
    'myTraining.myTrainingService'
  )
)
@reactAutobind
class UserMainPageV2 extends Component<Props> {
  //
  constructor(props: Props) {
    //
    super(props);

    const completedLearnings = window.sessionStorage.getItem('learningPassed');

    if (completedLearnings === null || completedLearnings.length < 1) {
      const { myTrainingService } = this.props;
      myTrainingService!.saveAllLearningPassedToStorage('Passed', '0');
    }
  }

  componentDidMount() {
    this.publishViewEvent();
    this.fetchAllModelsForStorage();
  }

  /* 메인 페이지 진입 시, 전체 학습중, 학습완료 데이터를 session storage 에 저장하기 위한 로직. */
  async fetchAllModelsForStorage() {
    const { myTrainingService } = this.props;

    if (sessionStorage.getItem('inProgressTableViews') === null) {
      const inProgressTableViews = await myTrainingService!.findAllInProgressTableViewsForStorage();
      if (inProgressTableViews && inProgressTableViews.length) {
        sessionStorage.setItem(
          'inProgressTableViews',
          JSON.stringify(inProgressTableViews)
        );
      }
    }

    if (sessionStorage.getItem('completedTableViews') === null) {
      const completedTableViews = await myTrainingService!.findAllCompletedTableViewsForStorage();
      if (completedTableViews && completedTableViews.length) {
        sessionStorage.setItem(
          'completedTableViews',
          JSON.stringify(completedTableViews)
        );
      }
    }
  }

  publishViewEvent() {
    const { actionEventService } = this.props;
    const menu = 'MAIN_VIEW';

    actionEventService.registerViewActionLog({ menu });
  }

  render() {
    const {} = this.props;
    //
    return (
      <ContentLayout className="main">
        <div className="main-wrap">
          <MyLearningSummary />
          <MyLearningContentContainer />
        </div>
      </ContentLayout>
    );
  }
}

export default UserMainPageV2;
