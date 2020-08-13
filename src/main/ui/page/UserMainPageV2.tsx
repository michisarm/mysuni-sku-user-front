import React, { Component } from 'react';
import {inject} from 'mobx-react';
import {mobxHelper, reactAutobind} from '@nara.platform/accent';
import { ContentLayout } from 'shared';
import { ActionEventService } from 'shared/stores';
import MyLearningSummary from '../../sub/MyLearningSummaryV2';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';
import MyTrainingService from '../../../myTraining/present/logic/MyTrainingService';


interface Props {
  actionEventService: ActionEventService;
  myTrainingService?: MyTrainingService;
}

@inject(mobxHelper.injectFrom(
  'shared.actionEventService',
  'myTraining.myTrainingService'
))
@reactAutobind
class UserMainPageV2 extends Component<Props> {
  //
  constructor(props: Props) {
    //
    super(props);

    const completedLearnings = window.sessionStorage.getItem('learningCompleted');
    if (!completedLearnings || completedLearnings.length < 1) {
      const { myTrainingService } = this.props;
      myTrainingService!.findAllLearningPassed('Passed', 0, 0);
    }
  }

  componentDidMount() {
    this.publishViewEvent();
  }

  publishViewEvent() {
    const { actionEventService } = this.props;
    const menu = 'MAIN_VIEW';

    actionEventService.registerViewActionLog({menu});
  }

  render() {
    //
    return (
      <ContentLayout className="main">
        <div className="main-wrap">
          <MyLearningSummary/>
          <MyLearningContentContainer/>
        </div>
      </ContentLayout>
    );
  }
}

export default UserMainPageV2;
