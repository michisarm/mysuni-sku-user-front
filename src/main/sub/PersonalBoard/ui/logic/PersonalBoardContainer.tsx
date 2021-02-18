import { mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import MyLearningSummaryModel from 'myTraining/model/MyLearningSummaryModel';
import { MyLearningSummaryService } from 'myTraining/stores';
import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';


interface Props extends RouteComponentProps {
  myLearningSummaryService?: MyLearningSummaryService;
}

function PersonalBoardContainer(props: Props){

  const { myLearningSummaryService } = props;
  const { totalMyLearningSummary2 } = myLearningSummaryService!;
  const history = useHistory();

  console.log('totalMyLearningSummary2', totalMyLearningSummary2)

return (
  <>
    <span>1234</span>
    뱃지<br/>
    학습시간<br/>
    학습시간상세<br/>
    영역별 학습시간<br/>
    우리회사 인기코스<br/>
  </>
)
}

// export default PersonalBoardContainer;

export default inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.myLearningSummaryService',
    'myTraining.myTrainingService',
    'badge.badgeService'
  )
)(withRouter(observer(PersonalBoardContainer)));