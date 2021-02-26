import React, { Fragment } from 'react';
import { Image, Progress } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import {
  useLectureSurveyAnswerSummaryList,
  useLectureSurveySummary,
} from 'lecture/detail/store/LectureSurveyStore';
import LectureSurveySummaryChoiceLayout from './LectureSurveySummaryChoiceLayout';

interface LectureSurveySummaryCriterionViewProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveyAnswerItem?: LectureSurveyAnswerItem;
}

const LectureSurveySummaryCriterionView: React.FC<LectureSurveySummaryCriterionViewProps> = function LectureSurveySummaryCriterionView({
  lectureSurveyItem,
  lectureSurveyAnswerItem,
}) {
  const answerList = useLectureSurveyAnswerSummaryList();
  const lectureSurveySummary = useLectureSurveySummary();
  const respondCount = lectureSurveySummary?.respondentCount.respondentCount;
  const { canMultipleAnswer, choices, questionNumber } = lectureSurveyItem;

  /*eslint-disable*/
  // 각 선택지 최댓값 구해서 파란색으로 표시
  const maxNum: number = Math.max.apply(
    Math,
    lectureSurveyItem.choices!.map(o => {
      return o.count!;
    })
  );
  /*eslint-enable */

  return (
    <LectureSurveySummaryChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        {!canMultipleAnswer &&
          choices &&
          choices.map(choice => {
            const criterionAvg =
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
                      percent={criterionAvg || 0}
                      style={{ opacity: 0.5 }}
                      color={maxNum === choice.count! ? 'blue' : 'grey'}
                    />
                    <span className="course-survey-list-persent-right">
                      <span className="course-survey-list-persent-number">
                        {choice.count}
                      </span>
                      {` (${criterionAvg || 0}%)`}
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
            const criterionAvg =
              choice.count !== undefined &&
              respondCount !== undefined &&
              ((choice.count / respondCount) * 100).toFixed(1);

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
                    lectureSurveyAnswerItem.criteriaItem !== undefined &&
                    lectureSurveyAnswerItem.criteriaItem.value === choice.no
                  }
                  readOnly={true}
                />
                {choice.count || '0'}
                <br />
                {criterionAvg || 0}
                {choice.image && <img src={choice.image} />} */}

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
                      percent={criterionAvg || 0}
                      style={{ opacity: 0.5 }}
                      color={maxNum === choice.count! ? 'blue' : 'grey'}
                    />
                    <span className="course-survey-list-persent-right">
                      <span className="course-survey-list-persent-number">
                        {choice.count}
                      </span>
                      {criterionAvg || 0}
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
    </LectureSurveySummaryChoiceLayout>
  );
};

export default LectureSurveySummaryCriterionView;
