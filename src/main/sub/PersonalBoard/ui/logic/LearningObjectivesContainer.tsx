import { observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useLearningObjectivesItem } from '../../store/PersonalBoardStore';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps {
  openLearningObjectives: () => void;
}

const LearningObjectivesContainer: React.FC<Props> =
  function LearningGoalContainer({ openLearningObjectives }) {
    const learningObjectives = useLearningObjectivesItem();

    return (
      <>
        {learningObjectives && (
          <div className="main-time-info">
            <span>
              <PolyglotText defaultString="하루" id="home-Summary-dailyD" />{' '}
              <em>
                {learningObjectives.DailyLearningTimeHour}
                <PolyglotText
                  defaultString="시간"
                  id="home-Summary-dailyH"
                />{' '}
                {learningObjectives.DailyLearningTimeMinute}
                <PolyglotText
                  defaultString="분"
                  id="home-Summary-dailyM"
                />{' '}
              </em>
              <PolyglotText
                defaultString="학습, 일주일"
                id="home-Summary-daily"
              />{' '}
              <em>
                {learningObjectives.WeekAttendanceGoal}
                <PolyglotText defaultString="일" id="home-Summary-weekD" />{' '}
              </em>
              <PolyglotText defaultString="출석" id="home-Summary-week" />
            </span>
            <button
              type="button"
              className="goal-setting"
              onClick={openLearningObjectives}
            />
          </div>
        )}
      </>
    );
  };

export default withRouter(observer(LearningObjectivesContainer));
