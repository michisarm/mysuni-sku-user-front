/* eslint-disable react-hooks/exhaustive-deps */
import MenuControlAuthService from 'approval/company/present/logic/MenuControlAuthService';
import { MyLearningSummaryService } from 'myTraining/stores';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { requestBadgeLearningTime } from '../../service/getBadgeLearningTime';
import { requestCollegePercent } from '../../service/getCollegePercent';
import { requestPopularCourse } from '../../service/getPopularCourse';
import { requestLearningObjectives } from '../../service/useLearningObjectives';
import { BadgeLearningTimeView } from '../view/BadgeLearningTimeView';
import CollegeTopChartView from '../view/CollegeTopChartView';
import LearningTimeDetailView from '../view/LearningTimeDetailView';
import MyCompanyPopularCourseView from '../view/MyCompanyPopularCourseView';
import { Area } from 'tracker/model';
import { Dimmer } from 'semantic-ui-react';
import { observer, Observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';

interface Props {
  companyCode: string;
  isVisible: boolean;
  close: () => void;
  myLearningSummaryService?: MyLearningSummaryService;
}

async function init() {
  const {
    getDisplayMySuniLeaningTime,
    getDisplayCompanyLearningTime,
    getDisplayTotalLearningTime,
    findInstructTimeSummary,
    findMyLearningSummaryByYear,
  } = MyLearningSummaryService.instance;

  await findInstructTimeSummary();
  await findMyLearningSummaryByYear();

  getDisplayTotalLearningTime();
  getDisplayMySuniLeaningTime();
  getDisplayCompanyLearningTime();
  requestCollegePercent();
}

export const PersonalBoardContainer = inject(
  mobxHelper.injectFrom('myTraining.myLearningSummaryService')
)(
  observer((props: Props) => {
    const { companyCode, isVisible, close, myLearningSummaryService } = props;

    const {
      myLearningSummary,
      instructTimeSummary,
      displayMyCompanyLearningTime,
      displayMySuniLearningTime,
      displayTotalLearningTime,
    } = myLearningSummaryService || MyLearningSummaryService.instance;

    const { menuControlAuth } = MenuControlAuthService.instance;

    useEffect(() => {
      if (isVisible) {
        requestBadgeLearningTime(companyCode);
        requestPopularCourse(companyCode, 7);
        requestLearningObjectives();
        init();
      }
    }, [isVisible]);

    const handlePopularCourseDate = useCallback((data: any) => {
      let date = 0;
      if (data.activeIndex === 0) {
        date = 7;
      } else if (data.activeIndex === 1) {
        date = 30;
      } else if (data.activeIndex === 2) {
        date = 90;
      }
      requestPopularCourse(companyCode, date);
    }, []);

    return (
      <>
        <div
          className={`personal-info-wrap ${isVisible ? 'visible' : ''}`}
          data-area={Area.MAIN_INFO}
        >
          <div className="inner">
            <div className="personal-contents">
              <BadgeLearningTimeView
                totalLearningTime={displayTotalLearningTime}
              />
              <LearningTimeDetailView
                showApl={menuControlAuth.useApl}
                mySuniLearningTime={displayMySuniLearningTime}
                myCompanyLearningTime={displayMyCompanyLearningTime}
                instructorTimeSummary={instructTimeSummary}
                aplTime={myLearningSummary && myLearningSummary.aplTime}
              />
              <CollegeTopChartView myLearningSummary={myLearningSummary} />
            </div>
            <MyCompanyPopularCourseView onTabClick={handlePopularCourseDate} />
          </div>
        </div>
        <Dimmer className="dimm_zidx" active={isVisible} page onClick={close} />
      </>
    );
  })
);
