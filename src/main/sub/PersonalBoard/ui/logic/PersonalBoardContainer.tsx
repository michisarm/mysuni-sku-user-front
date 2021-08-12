import MenuControlAuthService from 'approval/company/present/logic/MenuControlAuthService';
import { observer } from 'mobx-react';
import { MyLearningSummaryService } from 'myTraining/stores';
import React, { useCallback, useEffect } from 'react';
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

interface Props {
  companyCode: string;
  activeIndex: number;
}

function PersonalBoardContainer(props: Props) {
  const { companyCode, activeIndex } = props;
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
      <div className="personal-contents" data-area={Area.MAIN_INFO}>
        <BadgeLearningTimeView activeIndex={activeIndex} />
        <LearningTimeDetailView showApl={menuControlAuth.useApl} />
        <CollegeTopChartView
          myLearningSummary={myLearningSummary}
          activeIndex={activeIndex}
        />
      </div>
      <MyCompanyPopularCourseView onTabClick={handlePopularCourseDate} />
    </>
  );
}

export default observer(PersonalBoardContainer);
