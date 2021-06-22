import React from 'react';
import { ContentLayout } from '../../../shared';
import MainModals from '../../sub/MainModals/AiDtModalView';
import MyLearningSummaryContainer from '../../sub/MyLearningSummary/MyLearningSummaryContainer';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';
import MainPagePopupContainer from "../../sub/MainPagePopup/ui/logic/MainPagePopupContainer";

function UserMainPage() {
  return (
    <ContentLayout className="main">
      <div className="main-wrap personal-wrap">
        <MyLearningSummaryContainer />
        <MyLearningContentContainer />
        {/* <MainModals /> */}
        <MainPagePopupContainer/>
      </div>
    </ContentLayout>
  );
}

export default UserMainPage;
