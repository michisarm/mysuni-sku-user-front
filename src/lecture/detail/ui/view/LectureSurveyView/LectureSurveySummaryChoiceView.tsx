import React, { Fragment, useCallback } from 'react';
import {
  Checkbox,
  CheckboxProps,
  Radio,
  Progress,
  Image,
} from 'semantic-ui-react';
import { selectChoiceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
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
  console.log('!@!@', lectureSurveyAnswerItem?.itemNumbers);
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

            return (
              <Fragment key={choice.no}>
                {/* <Radio
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
                {choice.count || '0'}
                <br />
                {choiceAvg || 0}
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
                      percent={80}
                      style={{ opacity: 0.5 }}
                      color="blue"
                    />
                    <span className="course-survey-list-persent-right">
                      <span className="course-survey-list-persent-number">
                        {choice.count}
                      </span>
                      {choiceAvg || 0} {`내가 체크한 값 : ${isChecked}`}
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
                <Checkbox
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
                {choiceAvg || 0}
              </Fragment>
            );
          })}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryChoiceView;
