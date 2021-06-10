import React from 'react';
import { ContentLayout } from '../../../shared';
import MainModals from '../../sub/MainModals/AiDtModalView';
import MyLearningSummaryContainer from '../../sub/MyLearningSummary/MyLearningSummaryContainer';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';

function UserMainPage() {
  return (
    <ContentLayout className="main">
      <div className="main-wrap personal-wrap">
        <MyLearningSummaryContainer />
        <MyLearningContentContainer />
        {/* <MainModals /> */}
      </div>
    </ContentLayout>
  );
}

export default UserMainPage;
