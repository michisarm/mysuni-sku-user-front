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

interface Props {
  companyCode: string;
  isVisible: boolean;
  close: () => void;
}

export const PersonalBoardContainer = (props: Props) => {
  const { companyCode, isVisible, close } = props;
  const {
    myLearningSummary,
    instructTimeSummary,
    getDisplayMySuniLeaningTime,
    getDisplayCompanyLearningTime,
    getDisplayTotalLearningTime,
    findInstructTimeSummary,
    findMyLearningSummaryByYear,
    displayMyCompanyLearningTime,
    displayMySuniLearningTime,
  } = MyLearningSummaryService.instance;
  const { menuControlAuth } = MenuControlAuthService.instance;

  useEffect(() => {
    requestBadgeLearningTime(companyCode);
    requestPopularCourse(companyCode, 7);
    requestCollegePercent();
    requestLearningObjectives();
    init();
  }, []);

  const init = async () => {
    await findInstructTimeSummary();
    await findMyLearningSummaryByYear();

    getDisplayTotalLearningTime();
    getDisplayMySuniLeaningTime();
    getDisplayCompanyLearningTime();
  };

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
            <BadgeLearningTimeView />
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
};
