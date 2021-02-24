import { mobxHelper } from '@nara.platform/accent';
import BadgeService from 'certification/present/logic/BadgeService';
import { inject, observer } from 'mobx-react';
import { MyLearningSummaryService } from 'myTraining/stores';
import { SkProfileModel } from 'profile/model';
import { SkProfileService } from 'profile/stores';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { requestDashBoardSentence } from '../../service/getBadgeLearningTime';
import { useDashBoardSentenceItem } from '../../store/DashBoardSentenceStore';

function DashBoardSentenceContainer(){

  const dashBoardSentence = useDashBoardSentenceItem()
  console.log('dashBoardSentence', dashBoardSentence)
  useEffect(() => {
    requestDashBoardSentence()
  }, [])

return (
  <>
    <span>대시보드 문구</span>
  </>
)
}
export default DashBoardSentenceContainer

// export default inject(
//   mobxHelper.injectFrom(
//     'profile.skProfileService',
//     'myTraining.myLearningSummaryService',
//     'myTraining.myTrainingService',
//     'badge.badgeService',
//     'profile.skProfileService'
//   )
// )(withRouter(observer(DashBoardSentenceContainer)));