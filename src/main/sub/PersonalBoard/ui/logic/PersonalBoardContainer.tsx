import { mobxHelper } from '@nara.platform/accent';
import BadgeService from 'certification/present/logic/BadgeService';
import { inject, observer } from 'mobx-react';
import { MyLearningSummaryService } from 'myTraining/stores';
import { SkProfileService } from 'profile/stores';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { requestBadgeLearningTime } from '../../service/getBadgeLearningTime';
import { requestCollegePercent } from '../../service/getCollegePercent';
import { requestPopularCourse } from '../../service/getPopularCourse';
import { requestLearningObjectives } from '../../service/useLearningObjectives';
import { requestLearningTimeDetail } from '../../service/useLearningTimeDetail';
import BadgeLearningTimeView from '../view/BadgeLearningTimeView';
import CollegeTopChartView from '../view/CollegeTopChartView';
import LearningTimeDetailView from '../view/LearningTimeDetailView';
import MyCompanyPopularCourseView from '../view/MyCompanyPopularCourseView';


interface Props extends RouteComponentProps {
  myLearningSummaryService?: MyLearningSummaryService;
  badgeService?: BadgeService;
  skProfileService?: SkProfileService;
  companyCode: string;
  activeIndex: number;
}

function PersonalBoardContainer(props: Props){

  const { myLearningSummaryService, skProfileService, companyCode, activeIndex } = props;
  const { myLearningSummary } = myLearningSummaryService!;

  useEffect(() => {
    requestBadgeLearningTime(companyCode)
    requestLearningTimeDetail()
    requestPopularCourse(companyCode, 7)
    requestCollegePercent()
    requestLearningObjectives()
  }, [])

  const handlePopularCourseDate = useCallback((data: any) => {
    let date = 0
    if(data.activeIndex === 0) {
      date = 7
    } else if(data.activeIndex === 1) {
      date = 30
    } else if(data.activeIndex === 2) {
      date = 90
    }
      console.log('date', date)

    requestPopularCourse(companyCode, date)
  }, [])

return (
  <>
    <div className="personal-contents">
      <BadgeLearningTimeView activeIndex={activeIndex}/>
      <LearningTimeDetailView/>
      <CollegeTopChartView
        myLearningSummary={myLearningSummary}
        activeIndex={activeIndex}
      />
    </div>
    <MyCompanyPopularCourseView onTabClick={handlePopularCourseDate} />
  </>
)
}

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'myTraining.myTrainingService',
    'badge.badgeService',
    'profile.skProfileService'
  )
)(withRouter(observer(PersonalBoardContainer)));