import React, { Fragment, useCallback } from 'react';
import { Checkbox, CheckboxProps, Radio, Icon, Input } from 'semantic-ui-react';
import { selectChoiceAnswer } from '../../../service/useLectureSurvey/utility/saveLectureSurveyState';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import { LectureSurveyAnswerItem } from '../../../viewModel/LectureSurveyState';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';
import LectureSurveyState from '../../../viewModel/LectureSurveyState';
import LectureSurveySummary from 'lecture/detail/viewModel/LectureSurveySummary';

interface LectureSurveyItemProps {
  lectureSurveyItem: LectureSurveyItem;
  lectureSurveySummary?: LectureSurveySummary;
}

const LectureSurveySummaryChoiceView: React.FC<LectureSurveyItemProps> = function LectureSurveySummaryChoiceView({
  lectureSurveyItem,
  lectureSurveySummary
}) {
  const onChangeValue = useCallback(
    (_: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => {
      if (data.value === undefined) {
        return;
      }
      selectChoiceAnswer(lectureSurveyItem, data.value);
    },
    [lectureSurveyItem]
  );

  const { canMultipleAnswer, choices } = lectureSurveyItem;
  return (
    <LectureSurveyChoiceLayout {...lectureSurveyItem}>
      <div className="course-survey-list">
        응답 {lectureSurveySummary?.respondentCount.respondentCount}개<br />
        {console.log(lectureSurveySummary)}
        {!canMultipleAnswer &&
          choices &&
          choices.map(choice => (
            <Fragment key={choice.no}>
              <Input
                maxLength={100}
                label={choice.no}
                labelPosition="left"
                value={choice.title}
                readOnly
              />
              2 (100%)<br />
              {choice.image && <img src={choice.image} />}<br />
            </Fragment>
          ))}
        {canMultipleAnswer &&
          choices &&
          choices.map(choice => (
            <Fragment key={choice.no}>
              <Input
                maxLength={100}
                label={choice.no}
                labelPosition="left"
                value={choice.title}
                readOnly
              /><br />
              {choice.image && <img src={choice.image} />}<br />
            </Fragment>
          ))}
      </div>

    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveySummaryChoiceView;
