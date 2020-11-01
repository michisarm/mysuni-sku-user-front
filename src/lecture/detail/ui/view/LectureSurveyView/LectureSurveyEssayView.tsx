import React from 'react';
import { Checkbox, Form, Icon, Radio } from 'semantic-ui-react';
import { LectureSurveyItem } from '../../../viewModel/LectureSurvey';
import LectureSurveyChoiceLayout from './LectureSurveyChoiceLayout';

const LectureSurveyEssayView: React.FC<LectureSurveyItem> = function LectureSurveyEssayView(
  props
) {
  return (
    <LectureSurveyChoiceLayout {...props}>
      <Form>
        <Form.Field>
          <div className="ui right-top-count input">
            <span className="count">
              <span className="now">0</span>
              <span className="max">{`${props.maxLength}`}</span>
            </span>
            <textarea
              placeholder="답변을 입력해주세요."
              value=""
              onChange={undefined}
              readOnly={false}
            />
            <Icon className="clear link" />
            <span className="validation">
              {`You can enter up to ${props.maxLength} characters.`}
            </span>
          </div>
        </Form.Field>
      </Form>
    </LectureSurveyChoiceLayout>
  );
};

export default LectureSurveyEssayView;
