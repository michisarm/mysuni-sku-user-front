import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom';
import { useLearningObjectivesItem } from '../../store/PersonalBoardStore';
import { Icon, Image } from 'semantic-ui-react';

interface Props extends RouteComponentProps {
  openLearningObjectives : () => void
}

const LearningObjectivesContainer: React.FC<Props> = function LearningGoalContainer({
  openLearningObjectives
})
{
  const learningObjectives = useLearningObjectivesItem()

return (
  <>
  {learningObjectives && (
    <div className="main-stu-time">
      <span>
  하루 <em>{learningObjectives.DailyLearningTimeHour}시간 {learningObjectives.DailyLearningTimeMinute}분</em> 학습, 일주일 <em>{learningObjectives.WeekAttendanceGoal}일</em> 출석
      </span>
      <button type="button" className="org-active" onClick={openLearningObjectives}/>
    </div>
  )}
  </>
)
}

export default (withRouter(observer(LearningObjectivesContainer)));