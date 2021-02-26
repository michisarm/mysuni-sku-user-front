import React, { Fragment, useCallback, useEffect } from 'react';
import {
  Checkbox,
  CheckboxProps,
  Radio,
  Icon,
  Image,
  Progress,
} from 'semantic-ui-react';
import { selectCriterionAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import {
  useLectureSurveyAnswerSummaryList,
  useLectureSurveySummary,
} from 'lecture/detail/store/LectureSurveyStore';

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

  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        {!canMultipleAnswer &&
          choices &&
          choices.map(choice => {
            const criterionAvg =
              choice.count !== undefined &&
              respondCount !== undefined &&
              ((choice.count / respondCount) * 100).toFixed(1);

            return (
              <Fragment key={choice.no}>
                <li className="course-survey-list-cont">
                  <span className="course-survey-list-btnImg">
                    {lectureSurveyAnswerItem?.itemNumbers ? (
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
                      color="blue"
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
                    {lectureSurveyAnswerItem?.itemNumbers ? (
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
                      color="blue"
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
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryCriterionView;
