import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';

import { ContentLayout } from 'shared';
import MyLearningSummary from '../../sub/MyLearningSummaryV2';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';

@reactAutobind
class UserMainPageV2 extends Component {
  //
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
