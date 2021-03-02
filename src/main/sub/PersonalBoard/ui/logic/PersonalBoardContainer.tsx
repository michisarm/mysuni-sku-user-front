import { mobxHelper } from '@nara.platform/accent';
import BadgeService from 'certification/present/logic/BadgeService';
import { inject, observer } from 'mobx-react';
import { MyLearningSummaryService } from 'myTraining/stores';
import { SkProfileService } from 'profile/stores';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { requestBadgeLearningTime } from '../../service/getBadgeLearningTime';
import { requestPopularCourse } from '../../service/getPopularCourse';
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
}

function PersonalBoardContainer(props: Props){

  const { myLearningSummaryService, skProfileService, companyCode } = props;
  const { myLearningSummary } = myLearningSummaryService!;

  useEffect(() => {
    requestBadgeLearningTime(companyCode)
    requestLearningTimeDetail()
    requestPopularCourse(companyCode, 7)
  }, [])

  const handlePopularCourseDate = useCallback((date: number) => {
    requestPopularCourse(companyCode, date)
  }, [])

return (
  <>
    <BadgeLearningTimeView/><br/>
    <LearningTimeDetailView/><br/>
    <CollegeTopChartView
      myLearningSummary={myLearningSummary}
    /><br/>
    <MyCompanyPopularCourseView onTabClick={handlePopularCourseDate}/>
  </>
)
}

// export default PersonalBoardContainer;

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'myTraining.myTrainingService',
    'badge.badgeService',
    'profile.skProfileService'
  )
)(withRouter(observer(PersonalBoardContainer)));