import React, { useEffect } from 'react';
import { ContentLayout } from '../../../shared';
import MyLearningSummaryContainer from '../../sub/MyLearningSummary/MyLearningSummaryContainer';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';
import MainPagePopupContainer from '../../sub/MainPagePopup/ui/logic/MainPagePopupContainer';
import { BadgeService } from 'lecture/stores';

function UserMainPage() {
  useEffect(() => {
    BadgeService.instance.findAllBadgeCount();
  }, []);

  return (
    <ContentLayout className="main main-sty2">
      <div className="main-wrap personal-wrap">
        <MyLearningSummaryContainer />
        <MyLearningContentContainer />
        <MainPagePopupContainer />
      </div>
    </ContentLayout>
  );
}

export default UserMainPage;
