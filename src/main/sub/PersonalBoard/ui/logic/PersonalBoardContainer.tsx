import MenuControlAuthService from 'approval/company/present/logic/MenuControlAuthService';
import { MyLearningSummaryService } from 'myTraining/stores';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { requestBadgeLearningTime } from '../../service/getBadgeLearningTime';
import { requestCollegePercent } from '../../service/getCollegePercent';
import { requestPopularCourse } from '../../service/getPopularCourse';
import { requestLearningObjectives } from '../../service/useLearningObjectives';
import { requestLearningTimeDetail } from '../../service/useLearningTimeDetail';
import BadgeLearningTimeView from '../view/BadgeLearningTimeView';
import CollegeTopChartView from '../view/CollegeTopChartView';
import LearningTimeDetailView from '../view/LearningTimeDetailView';
import MyCompanyPopularCourseView from '../view/MyCompanyPopularCourseView';
import { Area } from 'tracker/model';
import { Dimmer } from 'semantic-ui-react';

interface Props {
  companyCode: string;
  isVisible: boolean;
}

export const PersonalBoardContainer = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { companyCode, isVisible } = props;
    const { myLearningSummary } = MyLearningSummaryService.instance;
    const { menuControlAuth } = MenuControlAuthService.instance;

    useEffect(() => {
      requestBadgeLearningTime(companyCode);
      requestLearningTimeDetail();
      requestPopularCourse(companyCode, 7);
      requestCollegePercent();
      requestLearningObjectives();
    }, []);

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
          ref={ref}
        >
          <div className="inner">
            <div className="personal-contents">
              <BadgeLearningTimeView />
              <LearningTimeDetailView showApl={menuControlAuth.useApl} />
              <CollegeTopChartView myLearningSummary={myLearningSummary} />
            </div>
            <MyCompanyPopularCourseView onTabClick={handlePopularCourseDate} />
          </div>
        </div>
        <Dimmer className="dimm_zidx2" active={isVisible} page />
      </>
    );
  }
);
