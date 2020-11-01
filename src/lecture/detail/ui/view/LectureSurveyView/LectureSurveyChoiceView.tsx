import React from 'react';
import { Checkbox, Radio } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

const LectureSurveyChoiceView: React.FC<LectureSurveyItem> = function LectureSurveyChoiceView(
  props
) {
  return (
    <LectureSurveyChoiceLayout {...props}>
      <div className="course-survey-list">
        {!props.canMultipleAnswer &&
          props.choices &&
          props.choices.map(choice => (
            <>
              <Radio
                key={choice.no}
                className="base"
                label={choice.title}
                name={`${choice.no}`}
                value={choice.no}
                checked={false}
                onChange={undefined}
                readOnly={false}
              />
              {choice.image && <img src={choice.image} />}
            </>
          ))}
        {props.canMultipleAnswer &&
          props.choices &&
          props.choices.map(choice => (
            <>
              <Checkbox
                key={choice.no}
                className="base"
                label={choice.title}
                name={`${choice.no}`}
                value={choice.no}
                checked={false}
                onChange={undefined}
                readOnly={false}
              />
              {choice.image && <img src={choice.image} />}
            </>
          ))}
      </div>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyChoiceView;
