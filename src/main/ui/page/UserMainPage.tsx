import React from 'react';
import { ContentLayout } from '../../../shared';
import MyLearningSummaryContainer from '../../sub/MyLearningSummary/MyLearningSummaryContainer';
import MyLearningContentContainer from '../../sub/MyLearningContentV2';
import MainPagePopupContainer from '../../sub/MainPagePopup/ui/logic/MainPagePopupContainer';
import { TutorialModal } from '../../../tutorial/components/tutorialModal';
import { usePageElements } from 'shared/store/PageElementsStore';

function UserMainPage() {
  const pageElements = usePageElements();
  const visibleTutorial = between(start, end);

  return (
    <ContentLayout className="main main-sty2">
      <div className="main-wrap personal-wrap">
        <MyLearningSummaryContainer pageElements={pageElements} />
        <MyLearningContentContainer />
        {/*<MainPagePopupContainer />*/}
        {visibleTutorial && <TutorialModal />}
      </div>
    </ContentLayout>
  );
}

export default UserMainPage;

const start = new Date('2022-02-08:00:00:00');
const end = new Date('2022-02-22:23:59:59');

function between(start: Date, end: Date): boolean {
  // TODO :: 배포 전 현재 시간으로 수정
  const now = new Date('2022-02-08:00:00:00');
  return now >= start && now <= end;
}
