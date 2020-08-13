import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import { ActionEventService } from 'shared/stores';
import MyLearningSummary from '../../sub/MyLearningSummaryV2';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';


interface Props {
  actionEventService: ActionEventService;
}

@inject(mobxHelper.injectFrom(
  'shared.actionEventService'
))
@reactAutobind
class UserMainPageV2 extends Component<Props> {
  //
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
