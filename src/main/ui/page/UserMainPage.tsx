import React from 'react';
import { ContentLayout } from '../../../shared';
import MyLearningSummaryContainer from '../../sub/MyLearningSummary/MyLearningSummaryContainer';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';
import MainPagePopupContainer from '../../sub/MainPagePopup/ui/logic/MainPagePopupContainer';
import { TutorialModal } from '../../../tutorial/components/tutorialModal';
import { usePageElements } from 'shared/store/PageElementsStore';

function UserMainPage() {
  const pageElements = usePageElements();
  return (
    <ContentLayout className="main main-sty2">
      <div className="main-wrap personal-wrap">
        <MyLearningSummaryContainer pageElements={pageElements} />
        <MyLearningContentContainer />
        {/*<MainPagePopupContainer />*/}
        {TutorialModal()}
      </div>
    </ContentLayout>
  );
}

export default UserMainPage;
