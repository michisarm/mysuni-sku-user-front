import { requestRecentlyStudyChannel } from 'lecture/recommend/service/getRecentlyStudyChannel';
import { requestPopularCourse } from 'main/sub/PersonalBoard/service/getPopularCourse';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

interface Props {
  companyCode: string;
}

function ChannelsHeaderInfoContainer(props: Props){
  
  const { companyCode } = props;

  useEffect(() => {
    // requestBadgeLearningTime(companyCode)
    // requestLearningTimeDetail()
    // requestPopularCourse(companyCode, 7)
    requestRecentlyStudyChannel()
    requestPopularCourse(companyCode, 7)
  }, [])


return (
  <>
    <div className="recommend-info">
      <div className="personal-channel-list">
        <h3>최근 학습중인 채널</h3>
        <span className="toggle toggle4" aria-pressed="false">
          AI Manufacturing Press
        </span>
        <span className="toggle toggle4" aria-pressed="false">
          Culture &#38; Valueㄹㄹㄹㄹㄹㄹ
        </span>
        <span className="toggle toggle4" aria-pressed="false">
          CLX University
        </span>
      </div>
      <div className="personal-channel-list">
        <h3>우리 회사 인기 채널</h3>
        <span className="toggle toggle4" aria-pressed="false">
          GC Green Channel
        </span>
        <span className="toggle toggle4" aria-pressed="false">
          SK C&#38;C 공통
        </span>
        <span className="toggle toggle4" aria-pressed="false">
          AI Manufacturing Press AI Manufacturing Press
        </span>
      </div>
    </div>
    {/* <BadgeLearningTimeView/><br/>
    <LearningTimeDetailView/><br/>
    <CollegeTopChartView
      myLearningSummary={myLearningSummary}
      collegeInfo={collegeInfo}
    /><br/>
    <MyCompanyPopularCourseView onTabClick={handlePopularCourseDate}/> */}
  </>
)
}

// export default PersonalBoardContainer;

export default ChannelsHeaderInfoContainer;