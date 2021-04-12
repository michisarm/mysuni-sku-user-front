import React from 'react';
import { useRequestLearningStorage } from '../../../myTraining/service/useRequestLearningStorage';
import { usePublishViewEvent } from '../../../myTraining/service/usePublishViewEvent';
import { ContentLayout } from '../../../shared';
import MainModals from '../../sub/MainModals/CoursePromotionModalView';
import MyLearningSummaryContainer from '../../sub/MyLearningSummary/MyLearningSummaryContainer';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';

function UserMainPage() {
  usePublishViewEvent('MAIN_VIEW');
  useRequestLearningStorage();
  
  return (
    <ContentLayout className="main">
      <div className="main-wrap personal-wrap">
        <MyLearningSummaryContainer />
        <MyLearningContentContainer />
        <MainModals />
      </div>
    </ContentLayout>
  );
}


export default UserMainPage;