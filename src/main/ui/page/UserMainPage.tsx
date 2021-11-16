import React from 'react';
import { ContentLayout } from '../../../shared';
import MyLearningSummaryContainer from '../../sub/MyLearningSummary/MyLearningSummaryContainer';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';
import MainPagePopupContainer from '../../sub/MainPagePopup/ui/logic/MainPagePopupContainer';
import { TutorialModal } from '../../../tutorial/components/tutorialModal';

function UserMainPage() {
  return (
    <ContentLayout className="main main-sty2">
      <div className="main-wrap personal-wrap">
        <MyLearningSummaryContainer />
        <MyLearningContentContainer />
        {/*<MainPagePopupContainer />*/}
        {TutorialModal()}
      </div>
    </ContentLayout>
  );
}

export default UserMainPage;
