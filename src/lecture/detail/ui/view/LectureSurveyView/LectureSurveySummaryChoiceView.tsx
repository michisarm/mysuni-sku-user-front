import React, { Fragment } from 'react';
import { Checkbox, Progress, Image } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import { useLectureSurveySummary } from 'lecture/detail/store/LectureSurveyStore';

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryChoiceView: React.FC<LectureSurveyItemProps> = function LectureSurveySummaryChoiceView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const lectureSurveySummary = useLectureSurveySummary();
  const respondCount = lectureSurveySummary?.respondentCount.respondentCount;
  const { canMultipleAnswer, choices, questionNumber } = lectureSurveyItem;
  const totalCount =
    lectureSurveyItem.choices?.reduce((totalCount, { count }) => {
      return totalCount + (count || 0);
    }, 0) || 0;

    return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        {!canMultipleAnswer &&
          choices &&
          choices.map((choice, index) => {
            const choiceAvg =
              choice.count !== undefined &&
              respondCount !== undefined &&
              ((choice.count / respondCount) * 100).toFixed(1);

            const isChecked = lectureSurveyAnswerItem?.itemNumbers?.includes(
              `${choice.no}`
            );
            console.log('true@@@', isChecked);
            return (
              <Fragment key={choice.no}>
                <li className="course-survey-list-cont">
                  <span className="course-survey-list-btnImg">
                    {isChecked === true ? (
                      <Image
                        src={`${process.env.PUBLIC_URL}/images/all/survay-radio-btn.png`}
                      />
                    ) : (
                      <Image
                        src={`${process.env.PUBLIC_URL}/images/all/survey-empty-btn.png`}
                      />
                    )}
                  </span>
                  <div className="course-survey-list-backgrondBar">
                    <Progress
                      percent={choiceAvg || 0}
                      style={{ opacity: 0.5 }}
                      color={`${isChecked && isChecked === true}` ? "blue" : "grey"}
                      // color="red"
                    />
                    <span className="course-survey-list-persent-right">
                      <span className="course-survey-list-persent-number">
                        {choice.count}
                      </span>
                      {choiceAvg || 0}
                    </span>
                    <li className="course-survey-list-text active">
                      {choice.title}
                    </li>
                  </div>
                </li>
              </Fragment>
            );
          })}

        {canMultipleAnswer &&
          choices &&
          choices.map(choice => {
            const choiceAvg =
              choice.count !== undefined &&
              respondCount !== undefined &&
              ((choice.count / totalCount) * 100).toFixed(1);

            const isChecked = lectureSurveyAnswerItem?.itemNumbers?.includes(
              `${choice.no}`
            );

            return (
              <Fragment key={choice.no}>
                {/* <Checkbox
                  className="base"
                  label={choice.title}
                  value={choice.no}
                  checked={
                    lectureSurveyAnswerItem !== undefined &&
                    lectureSurveyAnswerItem.itemNumbers !== undefined &&
                    lectureSurveyAnswerItem.itemNumbers.includes(`${choice.no}`)
                  }
                  readOnly={true}
                />
                {choice.image && <img src={choice.image} />}
                <br />
                {choice.count || '0'} {`내가 체크한 값 : ${isChecked}`}
                <br />
                {choiceAvg || 0} */}

                <li className="course-survey-list-cont">
                  <span className="course-survey-list-btnImg">
                    {
                      lectureSurveyAnswerItem?.itemNumbers ? 
                      <Image src={`${process.env.PUBLIC_URL}/images/all/survay-check-btn.png`} />
                      : 
                      <Image src={`${process.env.PUBLIC_URL}/images/all/empty-check-nomal.png`} />
                    }
                  </span>
                  <div className="course-survey-list-backgrondBar">
                    <Progress
                      percent={choiceAvg || 0}
                      style={{ opacity: 0.5 }}
                      color={`${isChecked && isChecked === true}` ? "blue" : "grey"}
                    />
                    <span className="course-survey-list-persent-right">
                      <span className="course-survey-list-persent-number">
                        {choice.count}
                      </span>
                      ({choiceAvg || 0}%)
                    </span>
                    <li className="course-survey-list-text active">
                      {choice.title}
                    </li>
                  </div>
                </li>
              </Fragment>
            );
          })}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryChoiceView;
