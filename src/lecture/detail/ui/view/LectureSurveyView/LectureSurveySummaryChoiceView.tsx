import React, { Fragment } from 'react';
import { Checkbox, Progress, Image } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import { useLectureSurveySummary } from 'lecture/detail/store/LectureSurveyStore';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';

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

  /*eslint-disable*/
  // 각 선택지 최댓값 구해서 파란색으로 표시
  const maxNum: number = Math.max.apply(
    Math,
    lectureSurveyItem.choices!.map(o => {
      return o.count === undefined ? 0 : o.count;
    })
  );
  /*eslint-enable */
  
  return (
    <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
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

            return (
              <Fragment key={choice.no}>
                <li className="course-survey-list-cont">
                  <span className="course-survey-list-btnImg">
                    {isChecked ? (
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
                      color={maxNum === choice.count! ? 'blue' : 'grey'}
                    />
                    <span className="course-survey-list-persent-right">
                      <span className="course-survey-list-persent-number">
                        {choice.count}
                      </span>
                      {` (${choiceAvg || 0}%)`}
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

            const isChecked: any = lectureSurveyAnswerItem?.itemNumbers?.includes(
              `${choice.no}`
            );

            return (
              <Fragment key={choice.no}>
                <li className="course-survey-list-cont">
                  <span className="course-survey-list-btnImg">
                    {isChecked ? (
                      <Image
                        src={`${process.env.PUBLIC_URL}/images/all/survay-check-btn.png`}
                      />
                    ) : (
                      <Image
                        src={`${process.env.PUBLIC_URL}/images/all/empty-check-nomal.png`}
                      />
                    )}
                  </span>
                  <div className="course-survey-list-backgrondBar">
                    <Progress
                      percent={choiceAvg || 0}
                      style={{ opacity: 0.5 }}
                      color={maxNum === choice.count! ? 'blue' : 'grey'}
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
                  <div className="course-survey-list-img-selector">
                    {choice.image && (
                      <Image
                        style={{ display: 'inline-block' }}
                        src={choice.image}
                      />
                    )}
                  </div>
                </li>
              </Fragment>
            );
          })}
      </div>
    </LectureSurveySummaryChoiceLayout>
  );
};

export default LectureSurveySummaryChoiceView;
